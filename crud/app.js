

// $(document).ready(function () 
// {
//     $('.example').DataTable();
// });



// function for getdata


getdata();

;

function getdata() {

    fetch("https://stage.webtalkx.com/api/I2BRecordingRequest/GetUserQuestionnare", {

        method: "POST",
        body: JSON.stringify({

            UserID: 1,
            EmailID: "piyush.goyal@mail.com",
            RefRecordingID: "10876",
        }),

        headers: {
            "Content-Type": "application/json"
        }


    }).then((response) => {

        // console.log(response)

        return response.json();


    }).then((data) => {

        // console.log(data);
         objectdata = data ;

        let tabledata = "";

        data.forEach((values) => {

            // console.log(values);

            tabledata +=

                ` <tr>
                     <td>${values?.QuestionOrder}</td>
                     <td>${values?.QuestionText}</td>
                     <td>
                     <button type="button" class="btn btn-danger delete_btn"    
                      data-bs-toggle="modal" data-bs-target="#deletemodal" >delete</button> &nbsp &nbsp<button type="button" class="btn btn-primary edit_btn" 
                       data-bs-toggle="modal" data-bs-target="#editModal">edit</i></button>
                   </td>
                      
                  </tr>`
        });

        document.getElementById('mytable').innerHTML = tabledata;
     
        
       deleterow();


    })


}



//  for insert  form data 

// get form values

var form = document.getElementById('form');

form.addEventListener('submit', (event) => {

    // prevent auto submition of form

    event.preventDefault();


    var Questiontext = document.getElementById('Question_text').value;

    var questionorder = document.getElementById('Question_orders').value;

    var Question_type = JSON.parse(document.getElementById('Question_type').value);

    var Answer_Limit = document.getElementById('Answer_Limit').value;



    // fetch request for post data 

    var url = "https://stage.webtalkx.com/api/I2BRecordingRequest/GetUserQuestionnare";


    fetch(url, {

        method: "POST",

        body: JSON.stringify({
            UserID: 1,
            RefRecordingID: 10876,
            QuestionText: Questiontext,
            QuestionOrder: questionorder,
            AnswerLimit: Answer_Limit,
            RecordQuestion: Question_type,
            EmailID: "piyush.goyal@mail.com"

        }),


        headers: {
            "Content-Type": "application/json; charset=UTF-8"
        }


    }).then((response) => {

        if (response) {

            return response.json()

        }


    }).then((data) => {


        // console.log( "chk data",data[0].ResponseStatus );

        if (data[0].ResponseStatus == "Success") {

            getdata();

        }


    })

})




function editPost(edit_field) {

    let edit_question = edit_field.getElementsByTagName('td');
    edit_question[0].innerHTML;
    edit_question[1].innerHTML;
    edit_question[2].innerHTML;


}




// for delete function 

var dataindex  ;


function deleterow() {

    var delete_btn = document.getElementsByClassName('delete_btn');

    let btn_len = delete_btn.length;

    // console.log(btn_len);

    for (let i = 0; i < btn_len; i++) {

        //  console.log("delete btn", delete_btn[i]);

        if (delete_btn[i]) {

            delete_btn[i].addEventListener('click' , () => {

                if (objectdata[i]) {

            //   console.log(objectdata[i])

                    dataindex = objectdata[i];


                }

            })

        }

    }

}



// function for delete question data by api


function deletedata() {

    if (dataindex) {
        fetch("https://stage.webtalkx.com/api/I2BRecordingRequest/DeleteQuestionFromUserQuestionnare",
            {
                method: 'PUT',
                body: JSON.stringify(dataindex),
                headers: {

                    "Content-Type": "application/json; charset=UTF-8"
                } 
       }  ) .then ((response)=>{

                return response.json()


       } ).then ((data) =>{
        //   console.log(data);

          if(data[0]){

            getdata();
          }
   
       })

    }

}







































































































var edit_btn = document.getElementsByClassName('edit_btn');