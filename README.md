# Import-Anleitung

Dieses Repository beinhaltet die gesamte "Applikation/Website" ohne vom Benutzer generierten Inhalt (Assets und DB). Die Datenbank und die Ordner uploads und fileadmin sind im jeweiligen Unterordner von `./dumps/**/*`.

1. Das Repository ist der Webroot der TYPO3 Instanz. Daher kann diese mittels git gecloned werden: `git clone https://github.com/sup7even/TYPO3-sae2017/ typo3` (das letzte Argument bedeutet das in den Unterordner "typo3" ausgehend vom aktuellen Ordner geklont wird)
2. Anschließend muss der Datenbankstand sowie die zu diesem Zeitpunkt entsprechenden Assets wiederhergestellt werden:
    1. fileadmin und uploads Ordner ggf. löschen
    2. fileadmin und uploads Ordner extrahieren: `tar -xzf ./dumps/170201-123456/*.tar.gz`
    3. Datenbank importieren: `mysql -uDeinDBUser -pDeinDbPasswort derDatenbankname < ./dumps/170201-123456/*.sql`
3. TYPO3 Installtool aufrufen: `http://pfadZumTypo3Projekt/typo3/install` (Passwort: `admin-sae`)
    1. Datenbankverbindungseinstellungen überprüfen: host, User, Pw, Datenbankname (dieser ist bei jedem anders)
    2. Anschließend TYPO3 Backend Administrator anlegen über das Installtool
4. Die TYPO3-Instanz ist lauffähig eingerichtet.
