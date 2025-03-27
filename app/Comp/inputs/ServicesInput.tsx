import { useFieldArray, useFormContext } from "react-hook-form";
import Input from "./Input";
import { AiOutlineMinus } from "react-icons/ai";

const ServicesInput = () => {
  const { control, register, watch, setValue, formState: { errors } } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "additionalServices",
  });

  const additionalServices = watch("additionalServices", []);

  const handleServiceChange = (index: number, field: "name" | "price", value: string) => {
    const updatedServices = [...additionalServices];
    updatedServices[index] = { ...updatedServices[index], [field]: value };
    setValue("additionalServices", updatedServices);
  };

  return (
    <div>
      {fields.map((field, index) => (
        <div key={field.id} className="flex gap-4 pb-2">
          <Input 
            id={`additionalServices.${index}.name`} 
            label="Service Name"
            register={register} 
            errors={errors}
            onChange={(e) => handleServiceChange(index, "name", e.target.value)}
          />
          <Input 
            id={`additionalServices.${index}.price`} 
            label="Cost"
            type="number"
            register={register} 
            errors={errors}
            onChange={(e) => handleServiceChange(index, "price", e.target.value)}
          />
          <button type="button" onClick={() => remove(index)}>
            <AiOutlineMinus/>
          </button>
        </div>
      ))}
      <button 
        type="button" 
        onClick={() => append({ name: "", price: "" })}
        className="border rounded-md py-1 px-2 mt-2 border-[#18306C] bg-[#423680] text-white font-semibold"
      >
        Add Service
      </button>
    </div>
  );
};

export default ServicesInput;
