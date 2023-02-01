import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

export function NotIn(property: string, validationOptions?: ValidationOptions) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return (object: Object, propertyName: string) => {
    registerDecorator({
      name: 'NotIn',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [property],
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatePropertyName] = args.constraints;
          const relatedValue = (args.object as any)[relatePropertyName];
          return (
            typeof value === 'string' &&
            typeof relatedValue === 'string' &&
            !relatedValue.includes(value)
          );
        },
      },
    });
  };
}
