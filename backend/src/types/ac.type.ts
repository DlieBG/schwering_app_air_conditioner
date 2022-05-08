export interface Ac {
    id: string;
    name: string;
}

export interface AcStatus {
    power: PowerEnum;
    minimumTemperatureSetpoint: number;
    maximumTemperatureSetpoint: number;
    temperatureSetpoint: number;
    temperature: number;
    humidity: number;
    mode: ModeEnum;
    windMode: WindModeEnum;
    windSpeed: WindSpeedEnum;
    windDirection: WindDirectionEnum;
}

export type PowerEnum = 'on' | 'off';

export type ModeEnum = 'cool' | 'heat' | 'wind' | 'dry' | 'auto' | 'aIComfort';

export type WindModeEnum = 'off' | 'sleep' | 'speed' | 'windFree' | 'windFreeSleep';

export type WindSpeedEnum = 'auto' | 'low' | 'medium' | 'high' | 'turbo';

export type WindDirectionEnum = 'fixed' | 'vertical' | 'horizontal' | 'all';
