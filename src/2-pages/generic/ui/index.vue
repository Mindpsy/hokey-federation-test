<script lang="ts" setup>
definePage({
  meta: {
    layout: 'home',
  },
});

interface Player {
  name: string;
  goals: number;
}

import { ref } from 'vue';

const players = ref<Player[]>([]);
const newName = ref('');
const newGoals = ref<number | string>(0);
const statsResult = ref<{ min: number; max: number; average: number } | null>(null);

function addPlayer() {
  const name = newName.value.trim();
  const goals = Number(newGoals.value);

  if (!name) {
    alert('Введите имя');
    return;
  }
  if (isNaN(goals) || goals < 0) {
    alert('Количество голов должно быть неотрицательным числом');
    return;
  }

  players.value.push({ name, goals });
  newName.value = '';
  newGoals.value = 0;
  statsResult.value = null;
}

function removePlayer(index: number) {
  players.value.splice(index, 1);
  statsResult.value = null;
}

function calculateStats<T>(
  items: T[],
  extractor: (item: T) => number
): { min: number; max: number; average: number } | null {
  if (items.length === 0) return null;
  const numbers = items.map(extractor);
  return {
    min: Math.min(...numbers),
    max: Math.max(...numbers),
    average: numbers.reduce((a, b) => a + b, 0) / numbers.length,
  };
}

function handleCalculate() {
  statsResult.value = calculateStats(players.value, (p) => p.goals);
}
</script>

<template>
  <h1>Generic Task Page</h1>
  <p>Функция:</p>
  <pre>
    <code lang="ts">
const calculateStats = &lt;T,&gt;(
  items: T[],
  extractor: (item: T) =&gt; number
): { min: number; max: number; average: number } | null =&gt; {
  if (items.length === 0) return null;

  const numbers = items.map(extractor);
  return {
    min: Math.min(...numbers),
    max: Math.max(...numbers),
    average: numbers.reduce((a, b) =&gt; a + b, 0) / numbers.length,
  };
};
    </code>
  </pre>
  <div class="players-list container">
    <div class="head-list">
      <div class="add-form">
        <input
          v-model="newName"
          type="text"
          placeholder="Имя игрока"
          class="input-field"
          @keyup.enter="addPlayer"
        />
        <input
          v-model.number="newGoals"
          type="number"
          placeholder="Голы"
          min="0"
          class="input-field"
          @keyup.enter="addPlayer"
        />
        <button @click="addPlayer" class="add-button">➕ Добавить</button>
      </div>
      <div class="action">
        <button
          @click="handleCalculate"
          :disabled="players.length === 0"
          class="calculate-badge"
        >
          Calculate
        </button>
      </div>
    </div>

    <div v-if="players.length" class="players-table">
      <div class="players-table__header">
        <div class="players-table__header-cell">Имя</div>
        <div class="players-table__header-cell">Голы</div>
        <div class="players-table__header-cell">Действие</div>
      </div>

      <div
        v-for="(player, index) in players"
        :key="index"
        class="player-row"
      >
        <div class="player-row__cell player-row__cell--name">{{ player.name }}</div>
        <div class="player-row__cell player-row__cell--goals">{{ player.goals }}</div>
        <div class="player-row__cell player-row__cell--action">
          <button @click="removePlayer(index)" class="delete-button">❌</button>
        </div>
      </div>
    </div>

    <p v-else class="no-results">Список пуст. Добавьте игроков.</p>

    <div v-if="statsResult" class="stats-block">
      <div class="stats-item">Min: {{ statsResult.min }}</div>
      <div class="stats-item">Max: {{ statsResult.max }}</div>
      <div class="stats-item">Average: {{ statsResult.average }}</div>
    </div>
    <div v-else-if="players.length === 0 && statsResult === null" class="stats-block">
      <div class="stats-item">Нет данных для расчёта</div>
    </div>
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
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.add-form {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  flex: 1 1 auto;
}

.input-field {
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  transition: border-color 0.2s;
  min-width: 180px;
  flex: 1 1 auto;

  &:focus {
    outline: none;
    border-color: #3b82f6;
  }
}

.add-button {
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  white-space: nowrap;

  &:hover {
    background: #2563eb;
  }
}

.action {
  display: flex;
  align-items: center;
}

.calculate-badge {
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 20px;
  padding: 0.5rem 1.5rem;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  white-space: nowrap;

  &:hover:not(:disabled) {
    background: #2563eb;
  }

  &:disabled {
    background: #cbd5e1;
    cursor: not-allowed;
  }
}

.players-table {
  display: flex;
  flex-direction: column;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  overflow: hidden;
  background: white;
  margin-bottom: 1.5rem;
}

.players-table__header {
  display: grid;
  grid-template-columns: 2fr 1fr 0.8fr;
  background: #f8fafc;
  padding: 0.75rem 1rem;
  font-weight: 600;
  color: #334155;
  border-bottom: 2px solid #cbd5e1;
}

.players-table__header-cell {
  padding: 0 0.5rem;
}

.player-row {
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
}

.player-row__cell {
  padding: 0 0.5rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  &--name {
    font-weight: 500;
    color: #0f172a;
  }

  &--goals {
    font-weight: 600;
    color: #0f172a;
  }

  &--action {
    display: flex;
    justify-content: flex-start;
  }
}

.delete-button {
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #fee2e2;
  }
}

.stats-block {
  display: flex;
  gap: 2rem;
  padding: 1rem;
  background: #f8fafc;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  margin-top: 1rem;
  flex-wrap: wrap;
}

.stats-item {
  font-size: 1rem;
  color: #334155;

  &:first-child {
    font-weight: 600;
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
  margin-bottom: 1.5rem;
}

@media (max-width: 640px) {
  .container {
    padding: 1rem;
  }

  .head-list {
    flex-direction: column;
    align-items: stretch;
  }

  .add-form {
    flex-direction: column;
    width: 100%;
  }

  .input-field {
    width: 100%;
  }

  .add-button {
    width: 100%;
  }

  .calculate-badge {
    width: 100%;
    text-align: center;
  }

  .players-table__header {
    display: none;
  }

  .player-row {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 0.5rem;
    padding: 1rem;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    margin-bottom: 0.75rem;
    background: white;

    &:hover {
      background-color: white;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    }
  }

  .player-row__cell {
    white-space: normal;

    &--name {
      font-size: 1.2rem;
      font-weight: 700;
    }

    &--goals {
      font-size: 1.2rem;
    }

    &--action {
      justify-content: flex-end;
    }
  }

  .stats-block {
    flex-direction: column;
    gap: 0.5rem;
    align-items: center;
  }
}
</style>