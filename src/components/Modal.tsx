import { CheckBox } from "./Checkbox";
import { Text } from "./Text";
import { Button } from "./Button";
import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { useFilterStore } from "@/store/UseFilterStore";
import { ConfirmationModal } from "./ConfirmationModal";

interface FilterOption {
    name: string;
}

interface FilterItem {
    name: string;
    options: FilterOption[];
}

function Modal({ onClose }: { onClose: () => void }) {
    const [filterItems, setFilterItems] = useState<FilterItem[]>([]);
    const [draftFilters, setDraftFilters] = useState<{ id: number; name: string }[]>([]);
    const [showConfirm, setShowConfirm] = useState(false);

    const filters = useFilterStore((state) => state.filters);
    const addFilter = useFilterStore((state) => state.addFilter);
    const clearFilters = useFilterStore((state) => state.clearFilters);

    useEffect(() => {
        setDraftFilters(filters);
    }, [filters]);

    useEffect(() => {
        fetch(new URL('../shared/temp/filterData.json', import.meta.url))
            .then(res => res.json())
            .then((data: { filterItems: FilterItem[] }) => {
                setFilterItems(data.filterItems);
            })
            .catch(err => console.error(err));
    }, []);

    const toggleOption = (name: string) => {
        setDraftFilters((prev) => {
            if (prev.some(f => f.name === name)) {
                return prev.filter(f => f.name !== name);
            }
            return [...prev, { id: Date.now(), name }];
        });
    };

    const applyDraftToStore = () => {
        clearFilters();
        draftFilters.forEach(f => addFilter(f.name));
    };

    return (
        <>
            <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 px-4 pb-20">
                <div className="relative bg-white rounded-2xl w-[90%] h-[90%] flex flex-col">

                    <div className="p-8 pb-4 relative border-b border-gray-300">
                        <Text size="lg" className="font-semibold text-center block">
                            Filter
                        </Text>
                        <IoClose
                            size={30}
                            className="absolute right-8 top-1/2 -translate-y-1/2 cursor-pointer"
                            onClick={onClose}
                        />
                    </div>

                    <div className="flex-1 overflow-y-auto px-8">
                        {filterItems.map((item, index) => (
                            <section key={index} className="my-10">
                                <Text size="md" className="font-semibold mb-3 block">
                                    {item.name}
                                </Text>

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-5 gap-x-7 my-5">
                                    {item.options.map((option, idx) => {
                                        const isChecked = draftFilters.some(f => f.name === option.name);

                                        return (
                                            <label key={idx} className="flex items-center gap-2">
                                                <CheckBox
                                                    checked={isChecked}
                                                    onChange={() => toggleOption(option.name)}
                                                />
                                                <Text size="sm">{option.name}</Text>
                                            </label>
                                        );
                                    })}
                                </div>

                                {index < filterItems.length - 1 && (
                                    <hr className="border-gray-300 my-10" />
                                )}
                            </section>
                        ))}
                    </div>

                    <div className="bg-white border-t border-gray-300 p-4 flex flex-col sm:flex-row items-center justify-center relative">
                        <Button
                            variant="primary"
                            onClick={() => {
                                const filtersChanged =
                                    filters.length !== draftFilters.length ||
                                    !draftFilters.every(df =>
                                        filters.some(f => f.name === df.name)
                                    );

                                if (!filtersChanged) {
                                    onClose();
                                    return;
                                }

                                setShowConfirm(true);
                            }}
                        >
                            Apply
                        </Button>

                        <Text
                            size="sm"
                            className="mt-2 sm:mt-0 sm:absolute sm:right-4 text-primary-100 underline cursor-pointer whitespace-nowrap"
                            onClick={() => setDraftFilters([])}
                        >
                            Clear all parameters
                        </Text>
                    </div>

                </div>
            </div>

            {showConfirm && (
                <ConfirmationModal
                    onClose={() => setShowConfirm(false)}
                    onCancel={() => setShowConfirm(false)}
                    onConfirm={() => {
                        applyDraftToStore();
                        setShowConfirm(false);
                        onClose();
                    }}
                />
            )}
        </>
    );
}

export { Modal };