
//glavni elementi ispisa u projekt.html datoteci
var outputDiv = document.getElementById('all-permutations');
var processDiv = document.getElementById('outOp');

//main funkcija koja se poziva na pritisak gumba 'Pretraži'
function Main(){
    var word = document.getElementById('word').value;
    if(word == "") return;

    processDiv.value += " > Defining variables: alphabet, numberedAlphabet\n"
    var alphabet = [];
    var numberedAlphabet = [];

    processDiv.value += " > Initializing variables: alphabet (int type: 65-90), numberedAlphabet (int type: 0)\n"
    for(let i=0; i<26; i++){
        alphabet[i] = (65+i).toString();
    }

    for(let i=0; i<26; i++){
        numberedAlphabet[i] = 0;
    }

    processDiv.value += " > Counting matching ASCII characters\n"
    for(let i=0; i<alphabet.length; i++){
        for(let j=0; j<word.length; j++){
            if(word[j].toUpperCase().charCodeAt(0) == alphabet[i]){
                processDiv.value += ` > ${word[j].toUpperCase().charCodeAt(0)} matches ${alphabet[i]}\n`;
                numberedAlphabet[i]++;
            }
        }
    }

    processDiv.value += ` > Configuring output string\n`;

    var selctedWayLecx = document.getElementById("lexicograph").value;
    var permWay = document.getElementById("way-of-perm").value;

    // Postavljanje prioriteta i uvjeta kad se određene funkcije smiju koristiti, a kad ne

    if(selctedWayLecx == "rijeci" && permWay == "trazi"){
        var output = "S = { ";
        for(let i=0; i<word.length; i++){
            for(let j=0; j<alphabet.length; j++){
                var wordIntValue = word[i].toUpperCase().charCodeAt(0);
                if(alphabet[j] == wordIntValue && !output.substring(1).includes(word[i].toUpperCase())){
                    processDiv.value += ` > Adding the letter ${String.fromCharCode(wordIntValue)} into the lexicograph\n`;

                    var interpunction = ", ";
                    output += `${word[i].toUpperCase()}x${numberedAlphabet[j]}${interpunction}`;
                    break;
                }
            }
        }
        output = output.substring(0, output.length-2) + " }\n";

        processDiv.value += ` > Finishing up\n`;
        outputDiv.innerHTML += " > " + output;
        processDiv.value += ` > Done!\n`;
    }else if(selctedWayLecx == "abecedi" && permWay == "trazi"){
        var output = "S = { ";
        for(let i=0; i<alphabet.length; i++){
            for(let j=0; j<word.length; j++){
                var wordIntValue = word[j].toUpperCase().charCodeAt(0);
                if(alphabet[i] == wordIntValue && !output.substring(1).includes(word[j].toUpperCase())){
                    processDiv.value += ` > Adding the letter ${String.fromCharCode(wordIntValue)} into the lexicograph\n`;

                    var interpunction = ", ";
                    output += `${word[j].toUpperCase()}x${numberedAlphabet[i]}${interpunction}`;
                    break;
                }
            }
        }
        output = output.substring(0, output.length-2) + " }\n";

        processDiv.value += ` > Finishing up\n`;
        outputDiv.innerHTML += " > " + output;
        processDiv.value += ` > Done!\n`;
    }else if(permWay == "nta" && selctedWayLecx == "ispis"){
        logWordAtIndex();
    }

    if(selctedWayLecx == "ispis" && permWay == "brPerm"){
        var perms = findAllPermutations(word);

        for(let i=0; i<perms.length; i++){
            outputDiv.value += ` > ${i+1}. permutacija je ${perms[i]}\n`;
            if(i > (998 + 3000)) break;
        }
    }
}

//funkcija za brisanje konzole
function clearConsole(){
    document.getElementById('all-permutations').value = "";
}

//funkcija za spremanje svih permutacija
function findAllPermutations(word){
    if(word.includes(" ")) 
        return -2;

    if(word.length >= 10) 
        return -1;

    const stringPermutations = str => {
        if (str.length <= 2) return str.length === 2 ? [str, str[1] + str[0]] : [str];

        return str.split('').reduce((acc, letter, i) => acc.concat(stringPermutations(str.slice(0, i) + str.slice(i + 1)).map(val => letter + val)),[]);
    };

    return stringPermutations(word);
}

//ispisivanje spremljenih permutacija
function logWordAtIndex(){
    var word = document.getElementById('word').value;
    var n = document.getElementById("permutation-num").value;
    var permutations = findAllPermutations(word, n);

    if(permutations == -2){
        outputDiv.value += " > String ne smije imati razmak u sebi\n"
        return;
    }

    if(permutations == -1) {
        outputDiv.value += " > Previše permutacija za računati (smanjit veličinu riječi)\n"
        return;
    }

    if(n >= permutations.length || n <=0) {
        outputDiv.value += " > String nema toliko permutacija\n"
        return;
    }

    var perm = permutations[n];
    outputDiv.value += ` > ${n}. permutacija riječi ${word} je ${perm}\n`;
}

//prikazivanje i skrivanje elementa 'n-ta permutacija zadane riječi'
function checkValueSelect2(){
    var permWay = document.getElementById("way-of-perm").value;
    var elem = document.getElementById("permutation-num");
    if(permWay !== "nta"){
        elem.style.display = "none";
    }else{
        elem.style.display = "block";
    }
}

//ažuriranje proces konzole i output konzole na svaku akciju
function updateProcess(text){
    var outOp = document.getElementById("outOp");
    outOp.scrollTop = outOp.scrollHeight;

    processDiv.value += ` > ${text}\n`;

    var console = document.getElementById('all-permutations');
    console.scrollTop = console.scrollHeight;
}