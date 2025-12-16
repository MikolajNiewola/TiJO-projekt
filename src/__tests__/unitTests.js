const { validateEmail, validatePassword } = require('../pages/LoginPage');
import { countId } from '../pages/NewTask';
import { sortArray, loadTasksFromStorage } from '../components/TaskList';

test('1: email vaildation test', () => {
    // Arrange
    const email = 'test@test.com';

    // Act
    const result = validateEmail(email);

    // Assert
    expect(result).toBe(true);
});

test('2: password validation test', () => {
    // Arrange
    const password = 'Password1!';

    // Act
    const result = validatePassword(password);

    // Assert
    expect(result).toBe(true);
});

test('3: invalid email validation test', () => {
    // Arrange
    const email = 'email.com';

    // Act
    const result = validateEmail(email);

    // Assert
    expect(result).toBe(false);
});

test('4: invalid password validation test', () => {
    // Arrange
    const password = 'password';

    // Act
    const result = validatePassword(password);
 
    // Assert
    expect(result).toBe(false);
});

test('5: count task ID when empty test', () => {
    // Arrange 
    localStorage.removeItem('tasks');
    
    // Act
    const result = countId();
    
    // Assert
    expect(result).toBe(1);
});

test('6: count task ID when not empty test', () => {
    // Arrange
    const tasks = [
        { id: 1, title: 'Task 1' },
        { id: 2, title: 'Task 2' }
    ];
    localStorage.setItem('tasks', JSON.stringify(tasks));

    // Act
    const result = countId();

    // Assert
    expect(result).toBe(3);
});

test('7: count task ID with non-sequential IDs test', () => {
    // Arrange
    const tasks = [ 
        { id: 1, title: 'Task 1' },
        { id: 3, title: 'Task 3' },
        { id: 5, title: 'Task 5' }
    ];
    localStorage.setItem('tasks', JSON.stringify(tasks));
    
    // Act
    const result = countId();
    
    // Assert
    expect(result).toBe(2);
});

test('8: array sort by priority test', () => {
    // Arrange
    const tasks = [
        { id: 1, title: 'Task 1', priority: 'low', status: 'pending', dateAdded: '2025-12-01' },
        { id: 2, title: 'Task 2', priority: 'medium', status: 'done', dateAdded: '2025-12-02' },
        { id: 3, title: 'Task 3', priority: 'high', status: 'pending', dateAdded: '2025-12-03' }
    ];

    // Act
    const result = sortArray(tasks, 'priority');

    // Assert
    expect(result[0].priority).toBe('high');
    expect(result[1].priority).toBe('medium');
    expect(result[2].priority).toBe('low');
});

test('9: array sort by status test', () => {
    // Arrange
    const tasks = [ 
        { id: 1, title: 'Task 1', priority: 'low', status: 'pending', dateAdded: '2025-12-03' },
        { id: 2, title: 'Task 2', priority: 'medium', status: 'done', dateAdded: '2025-12-01' },
        { id: 3, title: 'Task 3', priority: 'high', status: 'pending', dateAdded: '2025-12-02' }
    ];
    
    // Act
    const result = sortArray(tasks, 'status');
    
    // Assert
    expect(result[0].status).toBe('done');
    expect(result[1].status).toBe('pending');
    expect(result[2].status).toBe('pending');
});

test('10: array sort by date test', () => {
    // Arrange
    const tasks = [
        { id: 1, title: 'Task 1', priority: 'low', status: 'pending', dateAdded: '2025-12-03' },
        { id: 2, title: 'Task 2', priority: 'medium', status: 'done', dateAdded: '2025-12-01' },
        { id: 3, title: 'Task 3', priority: 'high', status: 'pending', dateAdded: '2025-12-02' }
    ];

    // Act
    const result = sortArray(tasks, 'date', 'asc');

    // Assert
    expect(result[0].dateAdded).toBe('2025-12-01');
    expect(result[1].dateAdded).toBe('2025-12-02');
    expect(result[2].dateAdded).toBe('2025-12-03');
});

test('11: load tasks from storage test', () => {
    // Arrange
    const tasks = [
        { id: 1, title: 'Task 1' },
        { id: 2, title: 'Task 2' }
    ];
    localStorage.setItem('tasks', JSON.stringify(tasks));

    // Act
    const result = loadTasksFromStorage();
 
    // Assert
    expect(result.length).toBe(2);
});