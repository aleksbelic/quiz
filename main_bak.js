$(document).ready( function() {
    
    // Counter

    const counter = {

        count : 1,

        range : [1,4], // should be dynamic according to items in quizdata

        countCheckRange : function(){
            if ( this.countGet() == this.range[0] ) {
                return 'start';
            } else if ( this.countGet() == this.range[1] ) {
                return 'end';
            } else if ( this.countGet() > this.range[0] && 
                        this.countGet() < this.range[1]) {
                return 'middle';
            } else {
                return 'outside';
            }
        },

        countSet : function(para){
            let c = this.count;
            if (para == 'up') {
                c += 1;
            } else if (para == 'down') {
                c -= 1;
            }
            this.count = c;
        },

        countGet : function(){
            return this.count;
        }

    };

    // Elements

    const elements = {
        setH2 : function() {
            let i = counter.countGet();
            $('h2').html('Frage ' + i);
        },

        setP : function() {
            let i = counter.countGet();
            $('p').html(quizdata["item" + i].q);
        },

        setA1 : function() {
            let i = counter.countGet();
            $('#a1').html(quizdata["item" + i].a1);
        },

        setA2 : function() {
            let i = counter.countGet();
            $('#a2').html(quizdata["item" + i].a2);
        },
        setAll : function() {
            this.setH2();
            this.setP();
            this.setA1();
            this.setA2();
        }

    };


    // Events

    elements.setAll();

    
    $('.answer').click( function() {

        if ( counter.countCheckRange() == 'start' || counter.countCheckRange() == 'middle' ) {

            counter.countSet('up');
            
            elements.setAll();

        }

    });

    $('#back').click( function() {

        if ( counter.countCheckRange() == 'end' || counter.countCheckRange() == 'middle' ) {

            counter.countSet('down');
            
            elements.setAll();

        }

    });

});