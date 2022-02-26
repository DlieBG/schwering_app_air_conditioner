import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { AcStatus, ModeEnum, PowerEnum, WindDirectionEnum, WindModeEnum, WindSpeedEnum } from 'src/types/ac.type';

@Injectable()
export class AcService {

    constructor() { }

    getStatus(id: string): Promise<AcStatus> {
        return new Promise<AcStatus>((resolve) => {
            axios
                .get(`https://api.smartthings.com/v1/devices/${id}/status`, {
                    headers: {
                        Authorization: `Bearer ${process.env.SMARTTHINGS_API_KEY}`
                    }
                })
                .then((response) => {
                    resolve({
                        power: response.data.components.main.switch.switch.value,
                        minimumTemperatureSetpoint: response.data.components.main['custom.thermostatSetpointControl'].minimumSetpoint.value,
                        maximumTemperatureSetpoint: response.data.components.main['custom.thermostatSetpointControl'].maximumSetpoint.value,
                        temperatureSetpoint: response.data.components.main.thermostatCoolingSetpoint.coolingSetpoint.value,
                        temperature: response.data.components.main.temperatureMeasurement.temperature.value,
                        humidity: response.data.components.main.relativeHumidityMeasurement.humidity.value,
                        mode: response.data.components.main.airConditionerMode.airConditionerMode.value,
                        windMode: response.data.components.main['custom.airConditionerOptionalMode'].acOptionalMode.value,
                        windSpeed: response.data.components.main.airConditionerFanMode.fanMode.value,
                        windDirection: response.data.components.main.fanOscillationMode.fanOscillationMode.value
                    });
                });
        });
    }

    setPower(id: string, value: PowerEnum): Promise<boolean> {
        return new Promise<boolean>((resolve) => {
            axios
                .post(`https://api.smartthings.com/v1/devices/${id}/commands`, {
                    "commands": [
                        {
                            "capability": "switch",
                            "command": value
                        }
                    ]
                },{
                    headers: {
                        Authorization: `Bearer ${process.env.SMARTTHINGS_API_KEY}`
                    }
                })
                .then((response) => {
                    resolve(response.data.results[0].status == 'ACCEPTED');
                });
        });
    }

    setTemperature(id: string, value: number): Promise<boolean> {
        return new Promise<boolean>((resolve) => {
            axios
                .post(`https://api.smartthings.com/v1/devices/${id}/commands`, {
                    "commands": [
                        {
                            "capability": "thermostatCoolingSetpoint",
                            "command": "setCoolingSetpoint",
                            "arguments": [ parseFloat(value.toString()) ]
                        }
                    ]
                },{
                    headers: {
                        Authorization: `Bearer ${process.env.SMARTTHINGS_API_KEY}`
                    }
                })
                .then((response) => {
                    resolve(response.data.results[0].status == 'ACCEPTED');
                });
        });
    }

    setMode(id: string, value: ModeEnum): Promise<boolean> {
        return new Promise<boolean>((resolve) => {
            axios
                .post(`https://api.smartthings.com/v1/devices/${id}/commands`, {
                    "commands": [
                        {
                            "capability": "airConditionerMode",
                            "command": "setAirConditionerMode",
                            "arguments": [ value ]
                        }
                    ]
                },{
                    headers: {
                        Authorization: `Bearer ${process.env.SMARTTHINGS_API_KEY}`
                    }
                })
                .then((response) => {
                    resolve(response.data.results[0].status == 'ACCEPTED');
                });
        });
    }

    setWindMode(id: string, value: WindModeEnum): Promise<boolean> {
        return new Promise<boolean>((resolve) => {
            axios
                .post(`https://api.smartthings.com/v1/devices/${id}/commands`, {
                    "commands": [
                        {
                            "capability": "custom.airConditionerOptionalMode",
                            "command": "setAcOptionalMode",
                            "arguments": [ value ]
                        }
                    ]
                },{
                    headers: {
                        Authorization: `Bearer ${process.env.SMARTTHINGS_API_KEY}`
                    }
                })
                .then((response) => {
                    resolve(response.data.results[0].status == 'ACCEPTED');
                });
        });
    }

    setWindSpeed(id: string, value: WindSpeedEnum): Promise<boolean> {
        return new Promise<boolean>((resolve) => {
            axios
                .post(`https://api.smartthings.com/v1/devices/${id}/commands`, {
                    "commands": [
                        {
                            "capability": "airConditionerFanMode",
                            "command": "setFanMode",
                            "arguments": [ value ]
                        }
                    ]
                },{
                    headers: {
                        Authorization: `Bearer ${process.env.SMARTTHINGS_API_KEY}`
                    }
                })
                .then((response) => {
                    resolve(response.data.results[0].status == 'ACCEPTED');
                });
        });
    }

    setWindDirection(id: string, value: WindDirectionEnum): Promise<boolean> {
        return new Promise<boolean>((resolve) => {
            axios
                .post(`https://api.smartthings.com/v1/devices/${id}/commands`, {
                    "commands": [
                        {
                            "capability": "fanOscillationMode",
                            "command": "setFanOscillationMode",
                            "arguments": [ value ]
                        }
                    ]
                },{
                    headers: {
                        Authorization: `Bearer ${process.env.SMARTTHINGS_API_KEY}`
                    }
                })
                .then((response) => {
                    resolve(response.data.results[0].status == 'ACCEPTED');
                });
        });
    }

}
