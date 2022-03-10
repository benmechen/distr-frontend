import Checkbox from '../../../../../../components/Checkbox/Checkbox';
import {
	Maybe,
	Property as PropertyType,
	Value,
} from '../../../../../../generated/graphql';
import {
	splitCamelCase,
	toTitleCase,
} from '../../../../../../utils/helper.service';

interface IProperty extends PropertyType {}
const Property = ({ name, value }: IProperty) => {
	const getValue = (value: Maybe<Value> | undefined) => {
		if (value?.boolValue != null)
			return (
				<Checkbox
					checked={value?.boolValue}
					disabled
					className="inline-block"
				/>
			);
		if (value?.structValue)
			return (
				<div className="bg-gray-100 rounded p-4 font-light">
					{JSON.stringify(value.structValue.fields)}
				</div>
			);
		if (value?.stringValue || value?.numberValue != null)
			return (
				<span className="font-light">
					{value.stringValue ?? value.numberValue}
				</span>
			);
	};

	return (
		<div className="font-medium">
			{toTitleCase(splitCamelCase(name))}: {getValue(value)}
		</div>
	);
};
export default Property;
