let form = $("#form-wrapper");
let scoreArray = [];



//Function to render above data in HTML
function renderData(data){
    for(let i=0; i<data.length; i++){
        console.log(data[i]);
        let quesSection = $("<div>").addClass("question-section");
        let h3 = $("<h3>").text("Q"+(i+1)+". "+data[i].question);
        quesSection.append(h3);
        for(let j=0; j<data[i].options.length;j++){
            let input = `<input type="radio" name="Q${i+1}" value="${j}" id="Q${(i+1)+data[i].options[j]}">
                        <label class="labels" for="Q${(i+1)+data[i].options[j]}">${data[i].options[j]}</label><br>`
            quesSection.append(input);
        }
        form.append(quesSection)        
    }

    let btn = `<input type="submit" value="Submit" id="btn">`;
    form.append(btn)

    let score = $("#score").text("0");
    $("#total").text(data.length)

    //Event handler for Form Submit Button
    form.submit(function(e){
        e.preventDefault();
        let input = $("input[type=radio]");
        let selectedAns = [];
        let correctAns = [];
        let count = 0;
        //to get all correct answers in a single array
        for(let j = 0; j<data.length; j++){
            correctAns.push(data[j].answer)
        }
        //to get all selected answers by user in a single array
        for(let i =0; i<input.length; i++){
            if(input[i].checked == true){
                selectedAns.push(Number(input[i].value)); 
            }
        }
        console.log(correctAns);
        console.log(selectedAns);
        if(selectedAns.length != 5){
            alert("Kindly Attempt All 5 Questions!")
        }
        else{
            for( let k = 0; k<correctAns.length; k++){
                if(correctAns[k] === selectedAns[k]){
                    count++;
                }
            }
            score.text(count)
        }
    })   
}

//fetching data using GET Request in JQuery
$.get("https://5d76bf96515d1a0014085cf9.mockapi.io/quiz", function(res){
    renderData(res)
})