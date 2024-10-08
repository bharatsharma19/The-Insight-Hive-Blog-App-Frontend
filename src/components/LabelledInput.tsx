import { ChangeEvent } from "react";

interface LabelledInputType {
    type?: string;
    label: string;
    id?: string; // Keep this to allow passing id as a prop
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const LabelledInput = ({ type, label, id, placeholder, onChange }: LabelledInputType) => {
    return (
        <div className="mt-4">
            <label htmlFor={id} className="block mb-2 text-sm font-bold text-black"> {/* Added htmlFor to link label and input */}
                {label}
            </label>
            <input
                type={type || "text"}
                id={id} // Correctly set the id prop here
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600"
                placeholder={placeholder}
                onChange={onChange}
                required
            />
        </div>
    );
};
