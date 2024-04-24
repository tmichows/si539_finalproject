window.addEventListener("load", function() {

    //Get the intial text from the html
	paragraph = document.getElementById("clickable");
    var text = paragraph.innerText;
    console.log("Paragraphs loaded in.")

    //Defining Page Specific Structural Vocabulary
    const indirect_question_structural_vocab = ["quaereretur","quaeres"]
    var number_of_indirect_questions_words = indirect_question_structural_vocab.length

    //Defining Page Specific Other Structural Vocabulary
    const other_structural_vocab = ["patiatur", "dixisse", "putabat", "posse", 
    "existimas","tot", "petimus", "debet", "videatur"]

    //Setup the counter
    document.getElementById("score").textContent = "There are " + 
    number_of_indirect_questions_words + " structural vocabulary words left.";

    //Since we're rebuilding the paragraph in JavaScript, have to empty this.
    paragraph.innerText = ''
    
    function wordClicker(event){
        var clickedWord = event.target.innerText.toLowerCase();

        //Correct Word
        if (indirect_question_structural_vocab.includes(clickedWord)) {
            event.target.classList.add('correct_sv');
             //Update Counter
             number_of_indirect_questions_words--;
             document.getElementById("score").textContent = 
             "There are " + number_of_indirect_questions_words
             + " structural vocabulary words left.";
        }
        //Close, but not quite
        else if (other_structural_vocab.includes(clickedWord)){
            event.target.classList.add("other_sv");
        }
        //Wrong
        else{
            event.target.classList.add("wrong_sv");
        }

        if(number_of_indirect_questions_words == 0)
        {
            document.getElementById("score").textContent = "Congrats! You found them all!";
            document.getElementById("score").disabled = true;
            confetti();
        }
    };

    //Using forEach loop, split all words apart and give them a span
    //so the word can be highlighted individually 
    text.split(/\b/).forEach(function(word) {
        var span = document.createElement('span');
        span.textContent = word; 
        
        // I had some feedback from a tester that it isn't clear if something is
        //clickable; so I looked up how to get that "hand" cursor from w3.
        if (/\w/.test(word)) {
            span.addEventListener('click', wordClicker);
            span.style.cursor = "pointer";
        }
        
        //add the new word to the HTML <p>
        paragraph.appendChild(span);
    });

});
