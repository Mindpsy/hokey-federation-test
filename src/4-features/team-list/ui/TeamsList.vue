<script lang="ts" setup>
import { ref, computed } from 'vue'
import { Cities } from '~entities/city';
import { TeamDTO } from '~entities/team'

const props = withDefaults(
  defineProps<{
    teams: Array<TeamDTO>
    isLoading?: boolean
    showFilter?: boolean
    showSort?: boolean
  }>(),
  {
    teams: () => [],
    isLoading: false,
    showFilter: false,
    showSort: false,
  }
)

const queryFilter = ref('')

const filteredAndSortedTeams = computed(() => {
  let result = [...props.teams]

  if (queryFilter.value) {
    const filter = queryFilter.value.toLowerCase()
    result = result.filter(team => team.name.toLowerCase().includes(filter))
  }

  if (props.showSort) {
    result.sort((a, b) => b.points - a.points)
  }

  return result
})

const maxPoints = computed(() => {
  if (filteredAndSortedTeams.value.length === 0) return 0
  return Math.max(...filteredAndSortedTeams.value.map(team => team.points))
})

const isLeader = (points: number) => points === maxPoints.value
</script>

<template>
  <div class="teams-list container">
    <!-- Шапка с фильтром и сортировкой -->
    <div class="head-list">
      <div class="filter" v-if="showFilter">
        <input
          type="text"
          v-model="queryFilter"
          placeholder="Фильтр по названию..."
          class="filter-input"
        />
      </div>
      <div class="sort" v-if="showSort">
        <span class="sort-badge">Сортировка по очкам ▼</span>
      </div>
    </div>

    <!-- Лоадер -->
    <div v-if="isLoading" class="loader">
      <span>Загрузка...</span>
    </div>

    <!-- Таблица команд -->
    <div v-else-if="filteredAndSortedTeams.length" class="teams-table">
      <!-- Заголовок таблицы (опционально) -->
      <div class="teams-table__header">
        <div class="teams-table__header-cell">Команда</div>
        <div class="teams-table__header-cell">Город</div>
        <div class="teams-table__header-cell">Очки</div>
      </div>

      <!-- Строки команд -->
      <div
        v-for="team in filteredAndSortedTeams"
        :key="team.id"
        class="team-row"
        :class="{ 'team-row--leader': isLeader(team.points) }"
      >
        <div class="team-row__cell team-row__cell--name">{{ team.name }}</div>
        <div class="team-row__cell team-row__cell--city">{{  Cities[team.city] }}</div>
        <div class="team-row__cell team-row__cell--points">{{ team.points }}</div>
      </div>
    </div>

    <!-- Сообщение, если ничего не найдено -->
    <p v-else class="no-results">Команды не найдены</p>
  </div>
</template>

<style lang="scss" scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1.5rem;
}

.head-list {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.filter-input {
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  width: 100%;
  max-width: 300px;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #3b82f6;
  }
}

.sort-badge {
  background: #3b82f6;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
  display: inline-block;
}

.loader {
  text-align: center;
  padding: 2rem;
  color: #64748b;
}

/* Таблица */
.teams-table {
  display: flex;
  flex-direction: column;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  overflow: hidden;
  background: white;
}

/* Заголовок таблицы */
.teams-table__header {
  display: grid;
  grid-template-columns: 2fr 1fr 0.8fr;
  background: #f8fafc;
  padding: 0.75rem 1rem;
  font-weight: 600;
  color: #334155;
  border-bottom: 2px solid #cbd5e1;
}

.teams-table__header-cell {
  padding: 0 0.5rem;
}

/* Строка команды */
.team-row {
  display: grid;
  grid-template-columns: 2fr 1fr 0.8fr;
  align-items: center;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #e2e8f0;
  transition: background-color 0.2s;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: #f1f5f9;
  }

  /* Подсветка лидера */
  &--leader {
    background: #fef9e7;
    border-left: 4px solid #fbbf24;
    margin-left: -1px; /* компенсация границы */
    padding-left: calc(1rem - 3px); /* сдвиг из-за border-left */
  }
}

/* Ячейки */
.team-row__cell {
  padding: 0 0.5rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  &--name {
    font-weight: 500;
    color: #0f172a;
  }

  &--city {
    color: #475569;
  }

  &--points {
    font-weight: 600;
    color: #0f172a;
  }
}

/* Адаптивность: на узких экранах превращаем таблицу в карточки */
@media (max-width: 640px) {
  .container {
    padding: 1rem;
  }

  /* Убираем заголовок таблицы */
  .teams-table__header {
    display: none;
  }

  /* Каждая строка становится карточкой с вертикальным расположением */
  .team-row {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 0.5rem;
    padding: 1rem;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    margin-bottom: 0.75rem;
    background: white;

    &--leader {
      border-left-width: 4px;
    }

    &:hover {
      background-color: white;
      box-shadow: 0 4px 6px rgba(0,0,0,0.05);
    }
  }

  .team-row__cell {
    white-space: normal;

    &--name {
      font-size: 1.2rem;
      font-weight: 700;
    }

    &--points {
      font-size: 1.2rem;
    }
  }
}

.no-results {
  text-align: center;
  padding: 3rem;
  background: #f8fafc;
  border-radius: 12px;
  color: #64748b;
  font-size: 1.2rem;
  border: 2px dashed #cbd5e1;
}

@media (max-width: 640px) {
  .container {
    padding: 1rem;
  }

  .teams-table__header {
    display: none;
  }

  .team-row {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 0.5rem;
    padding: 1rem;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    margin-bottom: 0.75rem;
    background: white;

    &--leader {
      background: #fef9e7;               /* ☑️ фон лидера */
      border-left: 4px solid #fbbf24;    /* ☑️ левая рамка */
      border-left-width: 4px;             /* (можно опустить, т.к. выше уже задано) */
    }

    &:hover {
      background-color: white;
      box-shadow: 0 4px 6px rgba(0,0,0,0.05);
    }
  }

  .team-row__cell {
    white-space: normal;

    &--name {
      font-size: 1.2rem;
      font-weight: 700;
    }

    &--points {
      font-size: 1.2rem;
    }
  }
}
</style>