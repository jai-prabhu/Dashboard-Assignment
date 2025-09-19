import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import data from './data/initialData.json'

const uid = () => Math.random().toString(36).slice(2) + Date.now().toString(36)

export const useDashboardStore = create(
  persist(
    (set, get) => ({
      categories: data.categories,
      widgets: data.widgets,

      addWidgetToCategory: (categoryId, name, text) => set(state => {
        const id = uid()
        const newWidget = { id, name, text }
        const widgets = { ...state.widgets, [id]: newWidget }
        const categories = state.categories.map(c => c.id === categoryId ? { ...c, widgetIds: [...c.widgetIds, id] } : c)
        return { widgets, categories }
      }),

      addExistingWidgetToCategory: (categoryId, widgetId) => set(state => {
        const cat = state.categories.find(c => c.id === categoryId)
        if (!cat) return {}
        if (cat.widgetIds.includes(widgetId)) return {}
        const categories = state.categories.map(c => c.id === categoryId ? { ...c, widgetIds: [...c.widgetIds, widgetId] } : c)
        return { categories }
      }),

      removeWidgetFromCategory: (categoryId, widgetId) => set(state => {
        const categories = state.categories.map(c => c.id === categoryId ? { ...c, widgetIds: c.widgetIds.filter(id => id !== widgetId) } : c)
        return { categories }
      }),

      setCategories: (categories) => set({ categories }),
      setWidgets: (widgets) => set({ widgets }),
    }),
    {
      name: 'dashboard-assignment',
      storage: createJSONStorage(() => localStorage)
    }
  )
)
