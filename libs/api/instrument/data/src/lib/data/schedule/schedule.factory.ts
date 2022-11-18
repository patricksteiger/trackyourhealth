import {
  Duration,
  TimingRepeat,
} from '@smile-cdr/fhirts/dist/FHIR-R4/classes/models-r4';

import {
  DayOfWeek,
  Decimal,
  Period,
  PositiveInt,
  Range,
  UnsignedInt,
  WhenCode,
} from './fhir.types';

export class Schedule {
  private timing: TimingRepeat;

  constructor(timing?: TimingRepeat) {
    // TODO: validate timing parameter
    this.timing = { ...timing };
  }

  withBoundsDuration(
    duration: Decimal,
    unit: TimingRepeat.DurationUnitEnum,
    comparator?: Duration.ComparatorEnum,
  ) {
    this.timing.boundsDuration = {
      value: duration,
      code: unit,
      comparator: comparator,
    };
    this.timing.boundsPeriod = undefined;
    this.timing.boundsRange = undefined;
    return this;
  }

  withBoundsPeriod(period: Period) {
    this.timing.boundsDuration = undefined;
    this.timing.boundsPeriod = period;
    this.timing.boundsRange = undefined;
    return this;
  }

  withBoundsRange(range: Range) {
    this.timing.boundsDuration = undefined;
    this.timing.boundsPeriod = undefined;
    this.timing.boundsRange = {
      low: {
        value: range.low?.value,
        code: range.low?.unit,
        comparator: range.low?.comparator,
      },
      high: {
        value: range.high?.value,
        code: range.high?.unit,
        comparator: range.high?.comparator,
      },
    };
    return this;
  }

  withCount<T extends number>(count: PositiveInt<T>, max?: PositiveInt<T>) {
    this.timing.count = count;
    this.timing.countMax = max;
    return this;
  }

  withDuration(
    duration: Decimal,
    unit: TimingRepeat.DurationUnitEnum,
    max?: Decimal,
  ) {
    this.timing.duration = duration;
    this.timing.durationUnit = unit;
    this.timing.durationMax = max;
    return this;
  }

  withFrequency<T extends number>(
    frequency: PositiveInt<T>,
    max?: PositiveInt<T>,
  ) {
    this.timing.frequency = frequency;
    this.timing.frequencyMax = max;
    return this;
  }

  withPeriod(
    period: Decimal,
    unit: TimingRepeat.PeriodUnitEnum,
    max?: Decimal,
  ) {
    this.timing.period = period;
    this.timing.periodUnit = unit;
    this.timing.periodMax = max;
    return this;
  }

  withDayOfWeek(daysOfWeek: DayOfWeek[]) {
    this.timing.dayOfWeek = daysOfWeek;
    return this;
  }

  withTimeOfDay(timesOfDay: string[]) {
    this.timing.timeOfDay = timesOfDay;
    this.timing.when = undefined;
    return this;
  }

  withWhen<T extends number>(when: WhenCode[], offset?: UnsignedInt<T>) {
    this.timing.timeOfDay = undefined;
    this.timing.when = when;
    this.timing.offset = offset;
    return this;
  }
}