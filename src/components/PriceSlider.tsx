'use client'
import React from "react";
import { Slider, SliderValue, Tooltip } from "@nextui-org/react";

export default function PriceSlider() {
    const [value, setValue] = React.useState<SliderValue>(1);
    const [inputValue, setInputValue] = React.useState<string>("1");

    const handleChange = (value: SliderValue) => {
        if (isNaN(Number(value))) return;

        setValue(value);
        setInputValue(value.toString());
    };

    return (
        <Slider
            label="Investment"
            size="sm"
            showSteps
            step={1000}
            maxValue={150000}
            minValue={0}
            color="foreground"
            classNames={{
                base: "max-w-md",
                label: "text-medium",
            }}
            
            // we extract the default children to render the input
            renderValue={({ children, ...props }) => (
                <output {...props}>
                    <Tooltip
                        className="text-tiny text-default-500 rounded-md"
                        content="Press Enter to confirm"
                        placement="left"
                    >
                        <input
                            className="px-1 py-0.5 w-16 text-right text-small text-default-700 font-medium bg-default-100 outline-none transition-colors rounded-small border-medium border-transparent hover:border-primary focus:border-primary"
                            type="text"
                            aria-label="Temperature value"
                            value={inputValue}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                const v = e.target.value;

                                setInputValue(v);
                            }}
                            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                                if (e.key === "Enter" && !isNaN(Number(inputValue))) {
                                    setValue(Number(inputValue));
                                }
                            }}
                        />
                    </Tooltip>
                </output>
            )}
            value={value}
            onChange={handleChange}
        />
    );
}
