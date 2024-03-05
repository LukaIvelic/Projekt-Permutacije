//
function displayP(elemId){
    var elem = document.getElementById(elemId);
    var elemArr = ['ld', 'pp', 'sd', 'smm', 'kr'];

    elemArr.forEach(job =>{
        if(job == elem.id){
            elem.style.display = "block";
        }else{
            document.getElementById(job).style.display = "none";
        }
    });
}

function scrollToTop(){
    var elem = document.getElementById('scrollInto');
    elem.scrollIntoView();
}

document.getElementById("outOp").innerHTML = "> Waiting for input...\n";