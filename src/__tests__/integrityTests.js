import App from "../App";
import { MemoryRouter, useLocation } from "react-router";
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

function LocationDisplay() {
    const location = useLocation();
    return <div data-testid="location-display">{location.pathname}</div>;
}

beforeEach(() => {
    localStorage.removeItem('userEmail');
})

test('1: navigation test', () => {
    render(
        <MemoryRouter initialEntries={['/']}>
            <App />
            <LocationDisplay />
        </MemoryRouter>
    );

    // Arrange
    const aboutLink = screen.getByText('About');

    // Act
    userEvent.click(aboutLink);
    const result = screen.getByTestId('location-display').textContent;

    // Assert
    expect(result).toBe('/about');
});

test('2: login test', async () => {
    render(
        <MemoryRouter initialEntries={['/login']}>
            <App />
            <LocationDisplay />
        </MemoryRouter>
    );

    // Arrange
    const emailInput = screen.getByPlaceholderText('Enter your email');
    const passwordInput = screen.getByPlaceholderText('Enter your password');
    const loginButton = screen.getByRole('button', { name: 'Login' });

    // Act
    userEvent.type(emailInput, 'test@example.com');
    userEvent.type(passwordInput, 'Test123');
    userEvent.click(loginButton);

    // Assert
    await waitFor(() => {
        const result = screen.getByTestId('location-display').textContent;
        expect(result).toBe('/');
    });
});

test('3: filter by status test', async () => {
    // Arrange
    localStorage.setItem('userEmail', 'test@example.com');
    localStorage.setItem('tasks', JSON.stringify([
        { id: 1, title: 'Task 1', status: 'pending', priority: 'high', date: '2025-12-01' },
        { id: 2, title: 'Task 2', status: 'done', priority: 'medium', date: '2025-12-02' },
        { id: 3, title: 'Task 3', status: 'pending', priority: 'low', date: '2025-12-03' },
    ]));

    render(
        <MemoryRouter initialEntries={['/']}>
            <App />
        </MemoryRouter>
    );

    // Arrange & Act
    const filterButton = screen.getByText('Filter');
    userEvent.click(filterButton);

    const doneCheckbox = screen.getByLabelText('Done');
    userEvent.click(doneCheckbox);

    const visibleTasks = document.querySelectorAll('.card');

    // Assert
    expect(visibleTasks).toHaveLength(1);
});

test('4: filter by priority test', async () => {
    // Arrange
    localStorage.setItem('userEmail', 'test@example.com');
    localStorage.setItem('tasks', JSON.stringify([
        { id: 1, title: 'Task 1', status: 'pending', priority: 'high', date: '2025-12-01' },
        { id: 2, title: 'Task 2', status: 'done', priority: 'high', date: '2025-12-02' },
        { id: 3, title: 'Task 3', status: 'pending', priority: 'low', date: '2025-12-03' },
    ]));

    render(
        <MemoryRouter initialEntries={['/']}>
            <App />
        </MemoryRouter>
    );

    // Arrange & Act
    const filterButton = screen.getByText('Filter');
    userEvent.click(filterButton);

    const doneCheckbox = screen.getByLabelText('High');
    userEvent.click(doneCheckbox);

    const visibleTasks = document.querySelectorAll('.card');

    // Assert
    expect(visibleTasks).toHaveLength(2);
});

test('5: sort by status test', () => {
    // Arrange
    localStorage.setItem('userEmail', 'test@example.com');
    localStorage.setItem('tasks', JSON.stringify([
        { id: 1, title: 'Task 1', status: 'pending', priority: 'high', date: '2025-12-01' },
        { id: 2, title: 'Task 2', status: 'done', priority: 'low', date: '2025-12-02' },
        { id: 3, title: 'Task 3', status: 'pending', priority: 'low', date: '2025-12-03' },
    ]));

    render(
        <MemoryRouter initialEntries={['/']}>
            <App />
        </MemoryRouter>
    );

    // Arrange & Act
    const sortButton = screen.getByText('Sort');
    userEvent.click(sortButton);

    const status = screen.getByText('By Status');
    userEvent.click(status);

    const Tasks = Array.from(document.querySelectorAll('.card'));
    const sortedTasks = Tasks.map(task => task.querySelector('.status-badge').textContent);

    // Assert
    expect(sortedTasks).toEqual(['done', 'pending', 'pending']);
});

test('6: check statistics test', () => {
    // Arrange
    localStorage.setItem('userEmail', 'test@example.com');
    localStorage.setItem('tasks', JSON.stringify([
        { id: 1, title: 'Task 1', status: 'pending', priority: 'high', date: '2025-12-01' },
        { id: 2, title: 'Task 2', status: 'done', priority: 'low', date: '2025-12-02' },
        { id: 3, title: 'Task 3', status: 'pending', priority: 'low', date: '2025-12-03' },
    ]));

    render(
        <MemoryRouter initialEntries={['/statistics']}>
            <App />
        </MemoryRouter>
    );
    const tiles = document.querySelectorAll('.statistics-tile');
    
    // Act
    const totalTasksTile = Array.from(tiles).find(tile => tile.querySelector('.title').textContent === 'Total Tasks')
    const totalValue = totalTasksTile.querySelector('.value').textContent;

    // Assert
    expect(totalValue).toBe('3');
});

test('7: delete task test', () => {
    // Arrange
    localStorage.setItem('userEmail', 'test@example.com');
    localStorage.setItem('tasks', JSON.stringify([
        { id: 1, title: 'Task 1', status: 'pending', priority: 'high', date: '2025-12-01' },
        { id: 2, title: 'Task 2', status: 'done', priority: 'low', date: '2025-12-02' },
    ]));

    render(
        <MemoryRouter initialEntries={['/']}>
            <App />
        </MemoryRouter>
    );

    // Act
    const tasks = document.querySelectorAll('.card');
    expect(tasks).toHaveLength(2);

    const firstTask = tasks[0];
    const { getByTitle } = within(firstTask);
    const deleteButton = getByTitle('Delete task');

    jest.spyOn(window, 'confirm').mockReturnValueOnce(true);

    userEvent.click(deleteButton);

    // Assert
    const remainingTasks = document.querySelectorAll('.card');
    expect(remainingTasks).toHaveLength(1);
});

test('8: edit task test', async () => {
    // Arrange
    localStorage.setItem('userEmail', 'test@example.com');
    localStorage.setItem('tasks', JSON.stringify([
        { id: 1, title: 'Task 1', status: 'pending', priority: 'high', date: '2025-12-01' },
    ]));

    render(
        <MemoryRouter initialEntries={['/']}>
            <App />
        </MemoryRouter>
    );

    const tasks = document.querySelectorAll('.card');

    const firstTask = tasks[0];
    const { getByTitle } = within(firstTask);
    const editButton = getByTitle('Edit task');

    // Act
    userEvent.click(editButton);
    
    const titleInput = await screen.findByPlaceholderText('Enter task title');
    titleInput.value = '';
    userEvent.type(titleInput, 'Updated Task Title');

    const saveButton = screen.getByRole('button', { name: 'Save Changes' });
    
    jest.spyOn(window, 'alert').mockReturnValueOnce(true);

    userEvent.click(saveButton);

    const updatedTasks = document.querySelectorAll('.card');
    const updatedFirstTask = updatedTasks[0];
    const result = updatedFirstTask.querySelector('.card-title').textContent;

    // Assert
    expect(result).toBe('Updated Task Title');
});

test('9: mark as done test', async () => {
    // Arrange
    localStorage.setItem('userEmail', 'test@example.com');
    localStorage.setItem('tasks', JSON.stringify([
        { id: 1, title: 'Task 1', status: 'pending', priority: 'high', date: '2025-12-01' },
    ]));

    render(
        <MemoryRouter initialEntries={['/']}>
            <App />
        </MemoryRouter>
    );

    const tasks = document.querySelectorAll('.card');

    const firstTask = tasks[0];
    const { getByTitle } = within(firstTask);
    const markAsDoneButton = getByTitle('Mark as complete');

    // Act
    userEvent.click(markAsDoneButton);

    const updatedTasks = document.querySelectorAll('.card');
    const updatedFirstTask = updatedTasks[0];
    const result = updatedFirstTask.querySelector('.status-badge').textContent;

    // Assert
    expect(result).toBe('done');
});

test('10: logout test', async () => {
    // Arrange
    localStorage.setItem('userEmail', 'test@example.com');

    render(
        <MemoryRouter initialEntries={['/']}>
            <App />
        </MemoryRouter>
    );

    const logoutButton = document.querySelector('.logout-button');
    
    // Act
    userEvent.click(logoutButton);

    // Assert
    await waitFor(() => {
        expect(localStorage.getItem('userEmail')).toBeNull();
    });
});