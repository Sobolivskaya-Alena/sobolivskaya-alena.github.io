document.getElementById('btn').onclick=function(){
    calcCost();
};

function calcCost(){
    var sP=document.getElementById('selectP').value;
    var nP=document.getElementById('numberP').value;
    var total=sP*nP;
    document.getElementById('priceP').innerHTML=total;
    document.getElementById('infoP').style.display='block';

    if(sP==0 || nP==0){
        document.getElementById('infoP').style.display='none';
        alert('Укажите значение');
        return;
    }
}