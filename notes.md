#Selbstkritik
- Plain Javascript ohne Framework erschwert Organisation des Codes
- Code verteilt auf mehere Dateien, müssen in richtiger Reihenfolge importiert werden
- Scriptdateien verlassen sich auf globale Variablen/Funktionen, die außerhalb der eigenen Datei deklariert wurden
- Initialisierung von onclick-Funktionen: Wäre schöner direkt im HTML, aber dort existieren die Funktionen noch nicht

- UI-Details von Hauptprogramm abgekapselt, aber game.js hat den Kontrollfluss und muss UI-Elemente aktiv steuern 
