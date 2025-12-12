import App from "../App";
import { MemoryRouter, useLocation } from "react-router";
import { getByRole, render, screen, waitFor, within } from "@testing-library/react";
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

    const aboutLink = screen.getByText('About');
    userEvent.click(aboutLink);

    expect(screen.getByTestId('location-display').textContent).toBe('/about');
});

test('2: login test', async () => {
    render(
        <MemoryRouter initialEntries={['/login']}>
            <App />
            <LocationDisplay />
        </MemoryRouter>
    );

    const emailInput = screen.getByPlaceholderText('Enter your email');
    const passwordInput = screen.getByPlaceholderText('Enter your password');
    const loginButton = screen.getByRole('button', { name: 'Login' });

    userEvent.type(emailInput, 'test@example.com');
    userEvent.type(passwordInput, 'Test123');

    userEvent.click(loginButton);

    await waitFor(() => {
        expect(screen.getByTestId('location-display').textContent).toBe('/');
    });
});

test('3: filter by status test', async () => {
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

    const filterButton = screen.getByText('Filter');
    userEvent.click(filterButton);

    const doneCheckbox = screen.getByLabelText('Done');
    userEvent.click(doneCheckbox);

    const visibleTasks = document.querySelectorAll('.card');

    expect(visibleTasks).toHaveLength(1);
});

test('4: filter by priority test', async () => {
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

    const filterButton = screen.getByText('Filter');
    userEvent.click(filterButton);

    const doneCheckbox = screen.getByLabelText('High');
    userEvent.click(doneCheckbox);

    const visibleTasks = document.querySelectorAll('.card');

    expect(visibleTasks).toHaveLength(2);
});

test('5: sort by status test', () => {
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

    const sortButton = screen.getByText('Sort');
    userEvent.click(sortButton);

    const status = screen.getByText('By Status');
    userEvent.click(status);

    const Tasks = Array.from(document.querySelectorAll('.card'));
    
    const sortedTasks = Tasks.map(task => task.querySelector('.status-badge').textContent);

    expect(sortedTasks).toEqual(['done', 'pending', 'pending']);
});

test('6: check statistics test', () => {
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

    const totalTasksTile = Array.from(tiles).find(tile => tile.querySelector('.title').textContent === 'Total Tasks')

    const totalValue = totalTasksTile.querySelector('.value').textContent;

    expect(totalValue).toBe('3');
});

test('7: delete task test', () => {
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

    const tasks = document.querySelectorAll('.card');
    expect(tasks).toHaveLength(2);

    const firstTask = tasks[0];
    const { getByTitle } = within(firstTask);
    const deleteButton = getByTitle('Delete task');

    jest.spyOn(window, 'confirm').mockReturnValueOnce(true);

    userEvent.click(deleteButton);

    const remainingTasks = document.querySelectorAll('.card');
    expect(remainingTasks).toHaveLength(1);
});

test('8: edit task test', async () => {
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

    userEvent.click(editButton);
    
    const titleInput = await screen.findByPlaceholderText('Enter task title');
    titleInput.value = '';
    userEvent.type(titleInput, 'Updated Task Title');

    const saveButton = screen.getByRole('button', { name: 'Save Changes' });
    
    jest.spyOn(window, 'alert').mockReturnValueOnce(true);

    userEvent.click(saveButton);

    const updatedTasks = document.querySelectorAll('.card');
    const updatedFirstTask = updatedTasks[0];
    expect(updatedFirstTask.querySelector('.card-title').textContent).toBe('Updated Task Title');
});

test('9: mark as done test', async () => {
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

    userEvent.click(markAsDoneButton);

    const updatedTasks = document.querySelectorAll('.card');
    const updatedFirstTask = updatedTasks[0];
    expect(updatedFirstTask.querySelector('.status-badge').textContent).toBe('done');
});

test('10: logout test', async () => {
    localStorage.setItem('userEmail', 'test@example.com');

    render(
        <MemoryRouter initialEntries={['/']}>
            <App />
        </MemoryRouter>
    );

    const logoutButton = document.querySelector('.logout-button');
    userEvent.click(logoutButton);

    await waitFor(() => {
        expect(localStorage.getItem('userEmail')).toBeNull();
    });
});