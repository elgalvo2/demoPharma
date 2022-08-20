import { useState, useEffect } from "react";


export function useFilter(initialState, items) {
    let [activeFilter, setActiveFilter] = useState(false);
    let [filterFields, setFilterFields] = useState(initialState)
    let [filteredItems, setFilteredItems] = useState([])

    const handleChange = (e)=>{
        setFilterFields({
            ...filterFields,
            [e.target.name]:e.target.value
        })
    }

    useEffect(() => {
        const initFilter = () => {
            if (JSON.stringify(filterFields) === JSON.stringify(initialState)) {
                setFilteredItems(items)
                setActiveFilter(false)
            } else {
                for (const [key, value] of Object.entries(filterFields)) {
                    if (value !== '') {
                        setFilterFields({
                            ...initialState,
                            [key]: value
                        })
                        setActiveFilter(true)
                        
                        items.forEach(element => {
                            if (element[key].indexOf(value.toUpperCase()) > -1) {
                                setFilteredItems(prev => {
                                    return [...prev, element]
                                })
                            }
                        });
                    }
                }
            }
        }
        initFilter()
        return () => {
            setFilteredItems([])
            setFilterFields(initialState)
            setActiveFilter(false)
        }
    }, [filterFields])

    return { filterFields, filteredItems,handleChange}
}