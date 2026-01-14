# Testowanie i Jakość Oprogramowania

# Autor

Mikołaj Niewola

# Temat projektu

Aplikacja ToDoList

# Opis projektu

W ramach projektu została przygotowana aplikacja webowa **ToDoList**, napisana w **React.js**, która umożliwia użytkownikowi zarządzanie zadaniami. Aplikacja pozwala na tworzenie tasków, które są wyświetlane w formie kafelków na stronie głównej. Każde zadanie posiada swój priorytet (low, medium lub high) oraz status (done lub pending). Użytkownik ma możliwość edycji i usuwania istniejących tasków, a także przeglądania statystyk, takich jak łączna liczba zadań, liczba zadań wykonanych oraz podział tasków według priorytetów.  
  
Aplikacja zsotała napisana w **JavaScript** z wykorzystaniem frameworka **React.js**. Do obsługi nawigacji pomiędzy widokami użyto biblioteki **React Router**. Projekt został przetestowany za pomocą biblioteki **Jest**.  
Interfejs użytkownika zsotał ostylowany za pomocą połączenia **Bootstrap**'a i arkuszy **CSS**. Obsługa ikon w aplikacji została zrealizowana za pomocą bibliotek **FontAwesome**.  
  
Aplikacja jest całkowicie frontendowa, przechowywanie tasków zostało zrealizowane za pomocą zapisu do **Local Storage**. Obsługa logowania i kont użytkowników została zamockowana przy użyciu prostych funkcji korzystających z Regexa.

# Uruchomienie projektu

Aby uruchomić projekt należy wykonać te czynności:
1. Pobrać projekt;
2. W głównym katalogu projektu uruchomić komendę:

        npm install
        
3. Będąc dalej w katalogu głównym wykonać komendę:

        npm start

4. Uruchomi się nam strona pod adresem:

        http://localhost:3000/

5. Teraz możemy korzystać z aplikacji.

# Testy

## Testy integracyjne

**test 1: navigation test** - test sprawdzający nawigację. Przechodzi z ścieżki "/" na ścieżkę "/about" i sprawadza czy adres url się zmienił.

Lokalizacja:  
> Linia 15: src/\_\_tests\_\_/integrityTests.js 

---

**test 2: login test** - test sprawdzający działanie logowania. Zaczyna na ścieżce "/login". Szuka pól z mailem i hasłem oraz przycisku do logowania. Wpisuje mail w pole mailowe oraz hasło spełniające wymogi Regexa po czym klika na przycisk od logowania. Sprawdza czy nastąpi przekierowanie do strony głównej poprzez url.

Lokalizacja:  
> Linia 34: src/\_\_tests\_\_/integrityTests.js 

---

**test 3: filter by status test** - test dodaje pare tasków do Local storage oraz ustawia zalogowanego użytkownika. Wyszukuje przycisk od filtrowania i ustawia filtrowanie na zadania zakończone poprzez przycisk 'Done'. Po tym sprawdza czy liczba widocznych tasków jest równa 1. 

Lokalizacja:  
> Linia 59: src/\_\_tests\_\_/integrityTests.js

---

**test 4: filter by priority test** - test dodaje pare tasków do Local storage oraz ustawia zalogowanego użytkownika. Wyszukuje przycisk od filtrowania i ustawia filtrowanie na zadania z priorytetem wysokim. Po tym sprawdza czy liczba widocznych tasków jest równa 2.

Lokalizacja:  
> Linia 87: src/\_\_tests\_\_/integrityTests.js 

---

**test 5: sort by status test** - test dodaje pare tasków do Local storage oraz ustawia zalogowanego użytkownika. Wyszukuje przycisk od sortowania i sortuje zadania przez status. Po tym sprawdza czy taski są ułożone w kolejności od zakończonych do trwających.

Lokalizacja:  
> Linia 115: src/\_\_tests\_\_/integrityTests.js 

---

**test 6: check statistics test** - test dodaje pare tasków do Local storage oraz ustawia zalogowanego użytkownika. Test zaczyna się na ścieżce "/statistics". Szuka kafelka, który wyświetla liczbę wszystkich tasków i sprawdza czy liczba jest równa 3.

Lokalizacja:  
> Linia 144: src/\_\_tests\_\_/integrityTests.js 

---

**test 7: delete task test** - test dodaje pare tasków do Local storage oraz ustawia zalogowanego użytkownika. Test sprawdza liczbę tasków, szuka pierwszego taska w tabeli i klika na przycisk od usunięcia. Za pomocą metody jest.spyOn() potwierdza usunięcie taska w alercie, po czym sprawdza czy liczba tasków się zmniejszyła. 

Lokalizacja:  
> Linia 168: src/\_\_tests\_\_/integrityTests.js 

---

**test 8: edit task test** - test dodaje task do Local storage oraz ustawia zalogowanego użytkownika. Test szuka pierwszego taska na liście i klika na przycisk edycji. Jest przekierowany na stronę edytowania gdzie szuka pola tytułu i zmienia je na 'Updated Task Title', po czym klika na przycisk od zapisania. Za pomocą metody jest.spyOn() zatwierdza alert, i wraca na stronę główną. Sprawdza czy tytuł pierwszego taska równa się 'Updated Task Title'.

Lokalizacja:  
> Linia 199: src/\_\_tests\_\_/integrityTests.js 

---

**test 9: mark as done test** - test dodaje task do Local storage z statusem 'pending' oraz ustawia zalogowanego użytkownika. Test szuka przycisku od zaznaczenia taska jako wykonany i go klika. Po tym sprawdza czy status pierwszego taska jest 'done'.

Lokalizacja:  
> Linia 239: src/\_\_tests\_\_/integrityTests.js 

---

**test 10: logout test** - test ustawia zalogowanego użytkownika. Test zaczyna się na stronie głównej, gdzie szuka przycisku wylogowania i go naciska. Po naciśnięciu sprawdza czy mail użytkownika jest zapisany w pamięci lokalnej.

Lokalizacja:  
> Linia 269: src/\_\_tests\_\_/integrityTests.js 

---

## Testy jednostkowe

**test 1: email validation test** - test sprawdzający walidację adresu email. Test podaje prawidłowo sformatowany email do funkcji i sprawdza czy zostanie zwrócony pozytywny wynik.

Lokalizacja:  
> Linia 5: src/\_\_tests\_\_/unitTests.js 

---

**test 2: password validation test** - test sprawdzający walidację hasła. Test podaje prawidłowe hasło do funkcji i sprawdza czy zostanie zwrócony pozytywny wynik. Funkcja przyjmuje tylko Hasła z minimum 1 duża Literą i minimum 1 cyfrą lub znakiem specjalnym.

Lokalizacja:  
> Linia 16: src/\_\_tests\_\_/unitTests.js 

---

**test 3: invalid email validation test** - test sprawdzający walidację adresu email. Test celowo podaje źle sformatowany adres email do funkcji i sprawdza czy zostanie zwrócony negatywny wynik.

Lokalizacja:  
> Linia 27: src/\_\_tests\_\_/unitTests.js 

---

**test 4: invalid password validation test** - test sprawdzający walidację hasła. Test celowo podaje źle sformatowane hasło do funkcji i sprawdza czy zostanie zwrócony negatywny wynik. Funkcja przyjmuje tylko Hasła z minimum 1 duża Literą i minimum 1 cyfrą lub znakiem specjalnym.

Lokalizacja:  
> Linia 38: src/\_\_tests\_\_/unitTests.js 

---

**test 5: count task ID when empty test** - test obliczający id do nowo tworzonego taska przy pustej liście. Test podaje pustą listę do funkcji i oczekuje wyniku równego 1.

Lokalizacja:  
> Linia 49: src/\_\_tests\_\_/unitTests.js 

---

**test 6: count task ID when not empty test** - test obliczający id do nowo tworzonego taska przy nie pustej liście. Test podaje listę z dwoma taskami do funkcji i oczekuje wyniku równego 3.

Lokalizacja:  
> Linia 60: src/\_\_tests\_\_/unitTests.js 

---

**test 7: count task ID with non-sequential IDs test** - test obliczający id do nowo tworzonego taska przy nie pustej liście nie wypełnionej nie sekwencyjnie. Test podaje listę z trzema taskami o id 1, 3 i 5 do funkcji i oczekuje wyniku równego 2.

Lokalizacja:  
> Linia 75: src/\_\_tests\_\_/unitTests.js 

---

**test 8: array sort by priority test** - test sprawdzający poprawność działania funkcji sortującej. Test podaje do funkcji tablicę zawierającą 3 taski z priority od low do high. Test wywołuje funkcje na tablicy i sprawdza czy wynikiem jest tablica ułożona od priority high do low.

Lokalizacja:  
> Linia 91: src/\_\_tests\_\_/unitTests.js 

---

**test 9: array sort by status test** - test sprawdzający poprawność działania funkcji sortującej. Test podaje do funkcji tablicę zawierającą 3 taski ze statusem pending, done, pending. Test wywołuje funkcje na tablicy i sprawdza czy wynikiem jest tablica ułożona done, pending, pending.

Lokalizacja:  
> Linia 108: src/\_\_tests\_\_/unitTests.js 

---

**test 10: array sort by date test** - test sprawdzający poprawność działania funkcji sortującej. Test podaje do funkcji tablicę zawierającą 3 taski z datami o dniach 03, 01, 02. Test wywołuje funkcje na tablicy i sprawdza czy wynikiem jest tablica z dniami ułożonymi od 01 do 03.

Lokalizacja:  
> Linia 125: src/\_\_tests\_\_/unitTests.js 

---

**test 11: load tasks from storage test** - test sprawdzający poprawność pobierania tasków z local storage. Test zapisuje tablicę z dwoma taskami do local storage. Po pobraniu sprawdza czy liczba tasków jest równa 2.

Lokalizacja:  
> Linia 142: src/\_\_tests\_\_/unitTests.js 

---

# Dokumentacja API

Aplikacja nie korzysta z żadnego API.

# Przypadki testowe dla testera manualnego

## TC001 - Logowanie

**Warunki początkowe**
- Strona jest włączona.
- Użytkownik jest na stronie logowania.

**Kroki testowe**  
1. Wprowadź Email w odpowiedniej formie.
2. Wprowadź hasło w odpowiedniej formie (min. 1 duża litera i min. 1 znak specjalny).
3. Naciśniej przycisk "Login"  .

**Oczekiwany rezultat**  
Nastąpi przekierowanie na stronę główną.  
W prawym górnym rogu pojawi się Email konta.  
Pojawi się dodatkowa strona "Statistics".  


## TC002 - Dodawanie zadań

**Warunki początkowe**
- Strona jest włączona.
- Użytkownik jest zalogowany na stronie głównej.

**Kroki testowe**  
1. Naciśnij przycisk "Add New Task".  
2. Wpisz tytuł zadania.
3. Wybierz priorytet.
4. Wpisz opis zadania.
5. Naciśnij przycisk "Add Task".

**Oczekiwany rezultat**  
Wyświetli się okienko potwierdzające dodanie zadania.  
Zadanie będzie widoczne na stronie głównej.  


## TC003 - Oznaczenie zadania jako zrobione

**Warunki początkowe**
- Strona jest włączona.
- Użytkownik jest zalogowany na stronie głównej.
- Jest przynajmniej 1 zadanie o statusie "Pending".

**Kroki testowe**  
1. Naciśnij przycisk z ikoną "znaku potwierdzenia". 

**Oczekiwany rezultat**  
Zadanie zostanie oznaczone jako "Done".  


## TC004 - Filtrowanie zadań przez priorytet

**Warunki początkowe**
- Strona jest włączona.
- Użytkownik jest zalogowany na stronie głównej.
- Jest dodane więcej niż jedno zadanie.

**Kroki testowe**  
1. Naciśnij przycisk "Filter".
2. Zaznacz priorytet "High".
3. Naciśnij przycisk "Filter".

**Oczekiwany rezultat**  
Zostaną widoczne tylko zadania z priorytetem "High".


## TC005 - Filtrowanie zadań przez status

**Warunki początkowe**
- Strona jest włączona.
- Użytkownik jest zalogowany na stronie głównej.
- Jest dodane więcej niż jedno zadanie.

**Kroki testowe**  
1. Naciśnij przycisk "Filter".
2. Zaznacz status "Done".
3. Naciśnij przycisk "Filter".

**Oczekiwany rezultat**  
Zostaną widoczne tylko zadania, które są skończone (status "Done").


## TC006 - Sortowanie zadań przez priorytet malejąco

**Warunki początkowe**
- Strona jest włączona.
- Użytkownik jest zalogowany na stronie głównej.
- Jest dodane więcej niż jedno zadanie.

**Kroki testowe**  
1. Naciśnij przycisk "Sort".
2. Zaznacz priorytet "By Priority".

**Oczekiwany rezultat**  
Zadania zostaną posortowane w kolejności malejącej (od priority high do priority low).


## TC007 - Sortowanie zadań przez priorytet rosnąco

**Warunki początkowe**
- Strona jest włączona.
- Użytkownik jest zalogowany na stronie głównej.
- Jest dodane więcej niż jedno zadanie.

**Kroki testowe**  
1. Naciśnij przycisk "Sort".
2. Zaznacz priorytet "By Priority".
3. Naciśnij przycisk "Sort".
4. Zaznacz priorytet "By Priority" ponownie.

**Oczekiwany rezultat**  
Zadania zostaną posortowane w kolejności rosnącej (od priority low do priority high).


## TC008 - Usuwanie zadań

**Warunki początkowe**
- Strona jest włączona.
- Użytkownik jest zalogowany na stronie głównej.
- Jest dodane przynajmniej jedno zadanie.

**Kroki testowe**  
1. Naciśnij na przycisk z ikoną kosza pod zadaniem do usunięcia.
2. Zatwierdź wybór.


**Oczekiwany rezultat**  
Lista zadań zostanie przeładowana.  
Zadanie zostanie usunięte.  


## TC009 - Edytowanie zadań

**Warunki początkowe**
- Strona jest włączona.
- Użytkownik jest zalogowany na stronie głównej.
- Jest dodane przynajmniej jedno zadanie.

**Kroki testowe**  
1. Naciśnij na przycisk z ikoną edycji pod zadaniem do edytowania.
2. Zmień tytuł zadania.
3. Naciśnij przycisk "Save Changes".
4. Zatwierdź powiadomienie o zmianie.

**Oczekiwany rezultat**  
Nastąpi przekierowanie na stronę główną.  
Zadanie będzie miało zmieniony tytuł. 


## TC010 - Wylogowanie

**Warunki początkowe**
- Strona jest włączona.
- Użytkownik jest zalogowany na stronie głównej.

**Kroki testowe**  
1. Naciśnij przycisk "Logout".

**Oczekiwany rezultat**  
Nastąpi przekierowanie na stronę główną.  
Będzie komunikat o wymogu logowania.  
Na pasku nawigacji nie będzie strony ze statystykami.  

# Technologie użyte w projekcie

W projekcie zostały wykorzystane technologie:

- JavaScript;
- React.js;
- Bootstrap;

Dodatkowo wykorzystano biblioteki Reacta takie jak:

- React Router
- Jest
- Font Awesome
