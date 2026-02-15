<script lang="ts" setup>
definePage({
  meta: {
    layout: 'home',
  },
})
</script>

<template>
  <main class="home-page">
    <section class="hero">
      <h1 class="hero__title">
        Главная страница тестового задания <br>для Федерации хоккея России
      </h1>
      <p class="hero__subtitle">
        Далее краткое описание тестового задания и его структуры
      </p>
    </section>

    <div class="tasks-grid">
      <article class="task-card">
        <h2 class="task-card__title">Задание 1. Vue 3 (SPA-компонент)</h2>
        <p class="task-card__description">
          Создайте компонент Vue 3 на Composition API, который отображает список хоккейных команд (поля: название, город, очки). Реализуйте:
        </p>
        <ul class="task-card__list">
          <li>Фильтрацию по названию команды (через инпут)</li>
          <li>Сортировку по очкам (по убыванию)</li>
          <li>Подсветку команды с максимальным количеством очков</li>
        </ul>
        <p class="task-card__requirements-title">Требования:</p>
        <ul class="task-card__list">
          <li>Использовать Vue 3 + Composition API</li>
          <li>Использовать TypeScript</li>
          <li>Состояние и методы должны быть правильно типизированы</li>
          <li>Компонент должен быть адаптивным (верстка упрощённая)</li>
        </ul>
      </article>

      <article class="task-card">
        <h2 class="task-card__title">Задание 2. TypeScript — статистика с дженериками</h2>
        <p class="task-card__description">
          Напишите функцию на TypeScript <code>calculateStats</code>, которая принимает массив элементов любого типа T и функцию extractor, которая преобразует элемент типа T в число. Функция должна возвращать объект со статистикой — минимальное, максимальное и среднее значение, вычисленные по числам, полученным из элементов массива с помощью extractor.
        </p>
        <ul class="task-card__list">
          <li>Функция должна быть строго типизирована с использованием дженериков</li>
          <li>Если массив пуст, вернуть null</li>
          <li>Пример:</li>
        </ul>
        <figure class="task-card__image">
          <img src="/public/images/Picture1.png" alt="Пример кода">
        </figure>
      </article>

      <article class="task-card">
        <h2 class="task-card__title">Задание 3. Общее (HTML/CSS + логика)</h2>
        <p class="task-card__description">
          Сделайте простую веб-страницу с HTML и CSS, на которой отображается табло хоккейного матча:
        </p>
        <ul class="task-card__list">
          <li>Имя команд слева и справа</li>
          <li>Текущий счёт по центру (например, 3 : 2)</li>
          <li>Кнопки “+” и “–” для увеличения/уменьшения счёта каждой команды (минимум 0)</li>
          <li>Цветовая индикация — команда, которая ведёт в счёте, выделена зелёным, при ничье — оба серым</li>
        </ul>
        <p class="task-card__description">Можно использовать чистый JS (без фреймворков), желательно аккуратная и адаптивная верстка.</p>
      </article>

      <article class="task-card task-card--wide">
        <h2 class="task-card__title">Тестовое задание по UI / UX</h2>
        <div class="ui-tasks">
          <div class="ui-task-item">
            <a href="https://dashlite.net/demo4/components/elements/buttons.html" target="_blank" rel="noopener" class="ui-task-link">
              Перенести во Vue компоненты кнопок из выделенного блока
            </a>
            <figure class="ui-task-image">
              <img src="/public/images/Picture2.png" alt="Пример кнопок">
            </figure>
          </div>
          <div class="ui-task-item">
            <a href="https://dashlite.net/demo4/components/forms/form-elements.html" target="_blank" rel="noopener" class="ui-task-link">
              Перенести во Vue компоненты кнопок из выделенного блока
            </a>
            <figure class="ui-task-image">
              <img src="/public/images/Picture3.png" alt="Пример форм">
            </figure>
          </div>
          <div class="ui-task-item">
            <a href="https://dashlite.net/demo4/components/elements/accordions.html" target="_blank" rel="noopener" class="ui-task-link">
              Перенести во Vue компонент accordion из выделенного блока
            </a>
            <figure class="ui-task-image">
              <img src="/public/images/Picture4.png" alt="Пример аккордеона">
            </figure>
          </div>
        </div>
      </article>
    </div>
  </main>
</template>

<style lang="scss" scoped>
:root {
  --bg-color: #f8fafc;
  --text-primary: #0f172a;
  --text-secondary: #334155;
  --accent-color: #3b82f6;
  --accent-hover: #2563eb;
  --card-bg: #ffffff;
  --card-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.02);
  --card-shadow-hover: 0 20px 30px -10px rgba(0, 0, 0, 0.1);
  --border-radius: 24px;
  --spacing: 2rem;
}

* {
  box-sizing: border-box;
}

.home-page {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  background-color: var(--bg-color);
  min-height: 100vh;
}

.hero {
  text-align: center;
  margin-bottom: 4rem;
  padding: 2rem 0;

  &__title {
    font-size: clamp(2rem, 5vw, 3.5rem);
    font-weight: 800;
    line-height: 1.2;
    background: linear-gradient(135deg, #0f172a 0%, #3b82f6 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 1rem;
  }

  &__subtitle {
    font-size: 1.25rem;
    color: var(--text-secondary);
    max-width: 600px;
    margin: 0 auto;
  }
}

.tasks-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
  gap: 2rem;
  align-items: start;
}

.task-card {
  background: var(--card-bg);
  border-radius: var(--border-radius);
  padding: 2rem;
  box-shadow: var(--card-shadow);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid rgba(0, 0, 0, 0.02);
  height: fit-content;

  &:hover {
    transform: translateY(-5px);
    box-shadow: var(--card-shadow-hover);
  }

  &--wide {
    grid-column: 1 / -1; 
  }

  &__title {
    font-size: 1.75rem;
    font-weight: 700;
    color: var(--text-primary);
    margin-top: 0;
    margin-bottom: 1.25rem;
    line-height: 1.3;
    position: relative;
    padding-bottom: 0.75rem;

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 60px;
      height: 4px;
      background: linear-gradient(90deg, var(--accent-color), #a78bfa);
      border-radius: 2px;
    }
  }

  &__description {
    font-size: 1rem;
    color: var(--text-secondary);
    line-height: 1.6;
    margin-bottom: 1.25rem;

    code {
      background: #eef2f6;
      padding: 0.2rem 0.4rem;
      border-radius: 6px;
      font-family: 'Fira Code', monospace;
      font-size: 0.9rem;
      color: #d53f8c;
    }
  }

  &__requirements-title {
    font-weight: 600;
    margin: 1rem 0 0.5rem;
    color: var(--text-primary);
  }

  &__list {
    list-style: none;
    padding: 0;
    margin: 0 0 1rem;

    li {
      padding-left: 1.75rem;
      position: relative;
      margin-bottom: 0.5rem;
      color: var(--text-secondary);
      line-height: 1.5;

      &::before {
        content: '🏒';
        position: absolute;
        left: 0;
        top: 0;
        font-size: 1rem;
        opacity: 0.8;
      }
    }
  }

  &__image {
    margin: 1.5rem 0 0;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    border: 1px solid #edf2f7;

    img {
      display: block;
      width: 100%;
      height: auto;
      transition: transform 0.3s;

      &:hover {
        transform: scale(1.02);
      }
    }
  }
}

.ui-tasks {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;
}

.ui-task-item {
  background: #f9f9fc;
  border-radius: 18px;
  padding: 1.5rem;
  transition: background 0.2s;

  &:hover {
    background: #f1f5f9;
  }
}

.ui-task-link {
  display: inline-block;
  margin-bottom: 1rem;
  font-weight: 500;
  color: var(--accent-color);
  text-decoration: none;
  border-bottom: 2px solid transparent;
  transition: border-color 0.2s;

  &:hover {
    border-bottom-color: var(--accent-hover);
  }
}

.ui-task-image {
  margin: 0;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #e2e8f0;

  img {
    width: 100%;
    height: auto;
    display: block;
  }
}

@media (max-width: 768px) {
  .home-page {
    padding: 1rem;
  }

  .tasks-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .task-card {
    padding: 1.5rem;
  }

  .ui-tasks {
    grid-template-columns: 1fr;
  }

  .hero {
    margin-bottom: 2rem;
  }
}
</style>