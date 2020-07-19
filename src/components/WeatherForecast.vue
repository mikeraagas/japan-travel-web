<template>
  <div class="weather-forecast">
    <!-- Start: Current Weather -->
    <div class="current-weather">
      <div v-show="isFetching" class="loading-overlay">
        <a-spin />
      </div>

      <h3>Weather Forecast</h3>
      <br>
      
      <weather-icon class="w-icon" :icon="weather.icon" />
      <p class="w-desc">
        {{ weather.description }}
      </p>

      <div class="w-temp">
        {{ weather.temp }}&#176;
      </div>
      <div class="w-loc">
        {{ weather.city }}
      </div>
    </div>
    <!-- End: Current Weather -->

    <!-- Start: Forecast Tabs -->
    <div class="weather-forecast">
      <a-tabs v-show="forecast.length" default-active-key="1">
        <a-tab-pane
          v-for="(entries, index) in forecast"
          :key="index"
          :tab="(index === 0) ? 'Today' : (index === 1) ? 'Tomorrow' : 'After'">
          
          <a-list :grid="{ gutter: 16, column: 3 }" :data-source="entries">
            <a-list-item slot="renderItem" slot-scope="entry">
              <a-card class="forecast-tpl">
                <div class="f-time">
                  {{ entry.time }}
                </div>
                <br>
                
                <weather-icon class="w-icon" :icon="entry.icon" />
                <p class="w-desc">
                  {{ entry.description }}
                </p>

                <div class="w-temp">
                  {{ entry.temp }}&#176;
                </div>
              </a-card>
            </a-list-item>
          </a-list>

        </a-tab-pane>
      </a-tabs>
    </div>
    <!-- End: Forecast Tabs -->
  </div>
</template>

<script>
import axios from 'axios';
import { DateTime } from 'luxon';
import WeatherIcon from 'vue-weathericons';
import wIcons from './weathericons.json';

export default {
  name: 'WeatherForecast',
  components: {
    WeatherIcon
  },
  data() {
    return {
      weather: {
        description: '--',
        temp: '--.-',
        city: 'Tokyo,Jp',
        icon: 'celsius'
      },
      forecast: [],
      isFetching: false
    }
  },
  props: [
    'near'
  ],
  methods: {
    async getCurrentWeather(near) {
      near = near || this.near;
      this.isFetching = true;

      try {
        const res = await axios.get(`${process.env.VUE_APP_API_URL}/weather/current`, {
          params: {
            q: near
          }
        });

        const result = res.data.result;
        const { weather, main, name, sys } = result;
        const { id: code, description } = weather[0];
        const { temp } = main;

        const icon = this.getIcon(code);
        
        this.weather = {
          description,
          temp,
          icon,
          city: `${name},${sys.country}`,
        };

        this.isFetching = false;
      } catch (e) {
        console.log(e);
      }
    },

    async getWeatherForecast(near) {
      near = near || this.near;
      this.isFetching = true;

      try {
        const res = await axios.get(`${process.env.VUE_APP_API_URL}/weather/forecast`, {
          params: {
            q: near
          }
        });

        const result = res.data.result;
        const { list } = result;
        let newList = {};

        // explode list data to date
        list.map(entry => {
          const { dt, weather, main } = entry;
          const { id: code, description } = weather[0];
          const { temp } = main;
          const icon = this.getIcon(code, dt);
          
          // get date and time
          const datetime = DateTime.fromSeconds(dt).setZone('Asia/Tokyo');
          const { year, month, day } = datetime;
          const date = `${year}-${month}-${day}`;
          const time = datetime.toLocaleString(DateTime.TIME_SIMPLE);

          if (!newList[date]) {
            newList[date] = [];
          }

          newList[date] = [
            ...newList[date],
            {
              description,
              temp,
              icon,
              time,
            }
          ];
        });

        // splice list and array to length of 3
        newList = Object.entries(newList).slice(0,3).map(entry => entry[1]);
        newList = newList.map(entries => {
          return entries.splice(0, 3);
        });

        this.forecast = newList;
        this.isFetching = false;
      } catch (e) {
        console.log(e);
      }
    },

    getIcon(code, dt) {
      let icon = wIcons[code].icon;

      // get icon based on openweathermap and weathericon mapping 
      // and datetime for day or night
      let today = DateTime.local().setZone('Asia/Tokyo');
      if (dt) {
        today = DateTime.fromSeconds(dt).setZone('Asia/Tokyo');
      }

      const hour = today.hour;

      if (hour > 6 && hour < 20) {
        icon = 'day-' + icon;
      } else {
        icon = 'night-' + icon;
      }

      return icon;
    }
  },
  created() {
    this.getCurrentWeather();
    this.getWeatherForecast();
  }
}
</script>

<style lang="scss">
  .weather-forecast {
    margin-top: 50px;

    .w-desc {
      text-transform: capitalize;
    }

    .current-weather {
      text-align: center;

      .loading-overlay {
        align-items: center;
        background-color: rgba(255,255,255,0.5);
        display: flex;
        justify-content: center;
        height: 100%;
        position: absolute;
        width: 100%;
      }
      
      .w-icon {
        font-size: 60px;
        margin-bottom: 10px;
      }

      .w-temp {
        font-size: 50px;
        font-weight: 500;
        line-height: 1.2;
      }

      .w-loc {
        font-size: 16px;
      }
    }

    .weather-forecast {
      .ant-tabs-nav-scroll {
        text-align: center;
      }

      .forecast-tpl {
        text-align: center;

        .w-icon {
          font-size: 30px;
          margin: 20px 0;
        }
      }
    }
  }
</style>
