# 🎧 MusicExplorationSystem

**MusicExplorationSystem** is a modern Angular-based application that implements an infinite scrolling experience for discovering and exploring songs. It features smart caching, dynamic data loading, and a reactive architecture built with Angular's latest standalone components and signals.

---

## 🚀 Features

- 🎵 **Endless Song Discovery** with infinite scrolling
- ⚙️ **Smart Caching** using a custom service (`SongsCacheService`)
- 📡 **API Integration** for dynamic song loading
- 🧠 **Reactive State** with Angular `signals`
- 📦 **Standalone Components** architecture
- 🧪 **Comprehensive Unit Testing** with Jasmine + Karma
- 🖱️ Powered by the **IntersectionObserver API**

---

## 📁 Project Structure

```bash
src/
├── app/
│   ├── core/                  # Core services (API, cache, observer)
│   ├── shared/                # Reusable UI components (badges, cards)
│   ├── features/
│   │   └── infinite-scroll/   # Main infinite scroll component
│   └── songs-card-list/       # Interfaces and models for songs
