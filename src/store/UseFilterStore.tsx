import { create } from 'zustand'

interface FilterState {
	filters: { id: number; name: string }[]
	addFilter: (name: string) => void
	removeFilter: (name: string) => void
	clearFilters: () => void
}

export const useFilterStore = create<FilterState>(set => ({
	filters: [],
	addFilter: name =>
		set(state => ({
			filters: [...state.filters, { id: Date.now(), name }]
		})),
	removeFilter: name =>
		set(state => ({
			filters: state.filters.filter(f => f.name !== name)
		})),
	clearFilters: () => set({ filters: [] })
}))
