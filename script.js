class Weather {
  constructor(formSelector, currentWeatherEl) {
    this.onFormSubmit = this.onFormSubmit.bind(this);

    this.formEl = document.querySelector(formSelector);
    this.currentWeatherEl = document.querySelector(currentWeatherEl);

    this.formEl.addEventListener('submit', this.onFormSubmit);
  }

  /**
   * Get Current Weather form submission handler
   */
  async onFormSubmit(e) {
    e.preventDefault();

    try {
      const location = this.formEl.location.value;
      const data = await this.fetchCurrentWeather(location);
      this.temperature = data.temp;
      this.description = data.weather.description;
      this.code = data.weather.code; // weather code

      console.log(data);

      this.displayCurrentWeather();
    } catch (err) { console.error(err); }
  }

  /**
   * Fetches the current weather for the given location
   * @param {*} location 
   * @returns {Promise}
   */
  async fetchCurrentWeather(location) {
    const params = new URLSearchParams({
      key: 'debe0953470740afb4198fd3c5fe7ab7', // Please don't steal my weather data.
      units: 'I',
      city: location
    });
    const url = `https://api.weatherbit.io/v2.0/current?${params.toString()}`;
    const res = await fetch(url);
    const data = (await res.json()).data[0];
    console.log(data.weather, data.weather.description);
    return data;
  }

  /**
   * Displays the current weather data
   */
  displayCurrentWeather() {
    this.displayCurrentWeatherIcon();
    this.displayCurrentTemperature();
    this.displayCurrentWeatherDescription();
  }

  displayCurrentWeatherIcon() {
    const weatherIcon = this.currentWeatherEl.querySelector('i');

    // Remove old weather icon class (.qi-###)
    const qiClassRegex = /(?=(\b| ))qi-\d+/;
    const matches = weatherIcon.classList.value.match(qiClassRegex);
    if (matches !== null) {
      weatherIcon.classList.remove(matches[0]);
    }

    // Add new qi class
    weatherIcon.classList.add(`qi-${this.code}`);
  }

  displayCurrentWeatherDescription() {
    this.currentWeatherEl.querySelector('p').textContent = this.description;
  }
  displayCurrentTemperature() {
    this.currentWeatherEl.querySelector('h2').textContent = this.temperature;
  }
}

new Weather('#getWeatherForm', '#currentWeather');