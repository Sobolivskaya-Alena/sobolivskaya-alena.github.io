"use strict";
document.addEventListener('DOMContentLoaded', function(){
    const form=document.getElementById('form');
    form.addEventListener('submit', formSend);

    async function formSend(e){
        e.preventDefault();

        let error=formValidator(form);
        let formData=new FormData(form);
       
        if(error==0){
            form.classList.add('_sending');
            let response = await fetch('sendmail.php',{
                method:'POST',
                body:formData
            });
            if (response.ok){
                
                let result=await response.json();
                alert(result.message);
                form.reset();
                form.classList.add('_sending');
            }else{
                alert("Ошибка");
                form.classList.add('_sending');
            }

        }else{
            alert ('Не все поля заполнены');
        }
    }

    function formValidator(form){
        let error=0;
        let formReq=document.querySelectorAll('._req, #tel');

        for(let index=0; index<formReq.length; index++){
            let input = formReq[index];
            formRemoveError(input);
            if(input.classList.contains('_email')){
                if(!emailTest(input)){
                    formAddError(input);
                    error++;
                }

            } else if(input.id == "tel"){
                if(!phoneTest(input)){
                    formAddError(input);
                    error++;
                }

            } else if(input.getAttribute("type")=== "checkbox" && input.checked===false){
                formAddError(input);
                    error++;
            } else{
                if(input.value===''){
                    formAddError(input);
                    error++;
                }
            }
        }
        return error;
    }

    function formAddError(input){
        input.parentElement.classList.add('_error');
        input.classList.add('_error');
    }
    function formRemoveError(input){
        input.parentElement.classList.remove('_error');
        input.classList.remove('_error');
    }
    function emailTest(input){
        return /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(input.value);
    }
    function phoneTest(input){
        return /^[\d\+][\d\(\)\ -]{4,14}\d$/.test(input.value);
    }
});


