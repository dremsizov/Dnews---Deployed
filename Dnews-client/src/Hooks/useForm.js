import { useEffect, useState } from "react";

export default function useForm(SubmitHandler, initialValues) {
  const [values, setValues] = useState(initialValues);

  useEffect(()=>{
    setValues(initialValues);
  },[initialValues]);

  const onChange = (e) => {
    setValues((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    
    const trimedData = Object.entries(values).reduce((acc, inputField) => {                                         // Using Object.entries to process each key-value pair in the input object
      const [inputFieldName, inputFieldValue] = inputField;
      
      if (inputFieldValue === '') {                                                               // If the value of the input field is an empty string, skip it in the result
          return acc;
        }
        
    e.currentTarget.reset();
      return { ...acc, [inputFieldName]: typeof inputFieldValue === 'string' ? inputFieldValue.trim() : inputFieldValue };
  }, {})
    
    
    // Object.fromEntries(
    //   Array.from(new FormData(e.target), ([key, value]) => [key, value.trim()])
    //   );
    
    SubmitHandler(trimedData);
  };
  return {
    values,
    onChange,
    onSubmit,
  };
}
