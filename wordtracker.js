const mysql = require('mysql');
const readline = require('readline');


// MySQL bağlantı ayarlarını düzenleyin
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: ' Buraya veritabanınızın şifresini yazın ',
  database: ' Veritabanınızın ismi '
});

// MySQL bağlantısını başlatın
connection.connect((err) => {
  if (err) {
    console.error('MySQL bağlantısı başarısız: ' + err.stack);
    return;
  }

  console.log('MySQL bağlantısı başarıyla gerçekleştirildi. - Komutları görmek için yaz: commands-');

  // Komut satırı arayüzünü oluştur
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  // Komutları dinle
  rl.on('line', (input) => {
    const command = input.trim();
    executeCommand(command);
  });
  
});

// Komutları işle
function executeCommand(command) {
  const parts = command.split(' ');
  const action = parts[0];

  if (action === 'addWord') {
    const word = parts[1];
    addWord(word);
  } else if (action === 'listWords') {
    listWords();
  } else if (action === 'updateWord') {
    const oldWord = parts[1];
    const newWord = parts[2];
    updateWord(oldWord, newWord);
  } else if (action === 'deleteWord') {
    const word = parts[1];
    deleteWord(word);
  } else if (action === 'learn') {
	const word = parts[1];
	const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
	
	fetch(`${url}${word}`)
	.then((response) => response.json())
	.then((data) => {
		 console.log(`

        details: 
        ${data[0].meanings[0].partOfSpeech}

        meaning: 
        ${data[0].meanings[0].definitions[0].definition}

        word-example:
        ${data[0].meanings[0].definitions[0].example || ""}
        
        `);
	})
	
	
  } else if(action === "commands"){
	  console.log(`
Command List: 
 1 - addWord    --> [word]
 2 - listWords
 3 - updateWord --> [old word] [new word] 
 4 - learn       --> [word]
 5 - the end     --> [word]
	  `);

  } else {
    console.log('Geçersiz komut. Lütfen geçerli bir komut girin.');
  }
}

// Yeni bir kelime eklemek için
function addWord(word) {
  connection.query('SELECT * FROM words WHERE word = ?', [word], (error, results) => {
    if (error) throw error;

    if (results.length === 0) {
      // Kelime veritabanında mevcut değil, yeni bir kayıt ekle
      connection.query('INSERT INTO words SET ?', { word: word, count: 1 }, (error) => {
        if (error) throw error;
            console.log(`
	-------
	
	Kelime eklendi
	
	-------
	`);
      });
    } else {
      // Kelime zaten mevcut, sayısını güncelle
      const count = results[0].count + 1;
      connection.query('UPDATE words SET count = ? WHERE word = ?', [count, word], (error) => {
        if (error) throw error;
        console.log('Kelime sayısı güncellendi.');
      });
    }
  });
}


// Tüm kelimeleri büyükten küçüğe sıralayarak listele
function listWords() {
  connection.query('SELECT * FROM words WHERE count >= 4 ORDER BY count DESC', (error, results) => {
    if (error) throw error;

    console.log(`
	-------
	
	Kelimeler
	
	-------
	`);
    results.forEach((row) => {
      console.log(row.word + ': ' + row.count);
    });
  });
}

// Bir kelimenin sayısını güncelle
function updateWord(word, newWord) {
  connection.query('UPDATE words SET word = ? WHERE word = ?', [newWord, word], (error) => {
    if (error) throw error;
    console.log('Kelime güncellendi.');
  });
}

// Bir kelimeyi sil
function deleteWord(word) {
  connection.query('DELETE FROM words WHERE word = ?', [word], (error) => {
    if (error) throw error;
    console.log('Kelime silindi.');
  });
}
