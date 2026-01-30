export interface IWeather {
    latitude: number
    longitude: number
    elevation: number
    utc_offset_seconds: number
    timezone: any
    timezone_abbreviation: any
    current: Current
    hourly: Hourly
    daily: Daily
}

export interface Current {
    time: string
    temperature_2m: number
    relative_humidity_2m: number
    apparent_temperature: number
    wind_speed_10m: number
    precipitation: number
}

export interface Hourly {
    time: string[]
    temperature_2m: any
    relative_humidity_2m: any
    weather_code: { [code: string]: number }
    rain: { [code: string]: number }
    showers: { [code: string]: number }
    snowfall: { [code: string]: number }
}

export interface Daily {
    time: string[]
    weather_code: WeatherCode2
    temperature_2m_max: Temperature2mMax
    temperature_2m_min: Temperature2mMin
}

export interface WeatherCode2 {
    "0": number
    "1": number
    "2": number
    "3": number
    "4": number
    "5": number
    "6": number
}

export interface Temperature2mMax {
    "0": number
    "1": number
    "2": number
    "3": number
    "4": number
    "5": number
    "6": number
}

export interface Temperature2mMin {
    "0": number
    "1": number
    "2": number
    "3": number
    "4": number
    "5": number
    "6": number
}