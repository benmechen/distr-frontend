import React, { LegacyRef, Ref } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import Checkbox from '../../../../../../components/Checkbox/Checkbox';
import { Input } from '../../../../../../components/Input';
import {
	Field as IFieldType,
	FieldType,
} from '../../../../../../generated/graphql';
import { toTitleCase } from '../../../../../../utils/helper.service';

interface IField extends IFieldType {
	className?: string;
}
const Field = React.forwardRef<
	HTMLInputElement | HTMLTextAreaElement,
	IField & UseFormRegisterReturn
>(
	(
		{
			type,
			name,
			required,
			description,
			fields,
			className,
			defaultValue,
			...props
		},
		ref,
	) => {
		const field = (type: FieldType) => {
			switch (type) {
				case FieldType.Boolean:
					return (
						<Checkbox
							label={toTitleCase(name)}
							required={required}
							defaultChecked={
								defaultValue?.boolValue ?? undefined
							}
							{...props}
							name={name}
							ref={ref as Ref<HTMLInputElement>}
						/>
					);
				case FieldType.Number:
					return (
						<Input
							placeholder={toTitleCase(name)}
							type="number"
							required={required}
							defaultValue={
								defaultValue?.numberValue ?? undefined
							}
							{...props}
							name={name}
							ref={ref as Ref<HTMLInputElement>}
						/>
					);
				case FieldType.Struct:
					return (
						<textarea
							placeholder={toTitleCase(name)}
							required={required}
							defaultValue={
								JSON.stringify(
									defaultValue?.structValue?.fields,
								) ??
								defaultValue?.stringValue ??
								undefined
							}
							{...props}
							name={name}
							ref={ref as Ref<HTMLTextAreaElement>}
						></textarea>
					);
				case FieldType.String:
					return (
						<Input
							placeholder={toTitleCase(name)}
							type="text"
							required={required}
							defaultValue={
								defaultValue?.stringValue ?? undefined
							}
							{...props}
							name={name}
							ref={ref as Ref<HTMLInputElement>}
						/>
					);
			}
		};

		if (fields)
			return (
				<div className={'mt-6 ' + className}>
					<p className="font-bold text-sm">{name}</p>
					<p className="font-light text-sm">{description}</p>
					<div className="ml-4 mt-4">
						{fields.map((field) => (
							<Field key={field.name} {...field} {...props} />
						))}
					</div>
				</div>
			);

		return (
			<div className={className}>
				<label className="text-sm font-light">{description}</label>
				{field(type)}
			</div>
		);
	},
);
export default Field;
