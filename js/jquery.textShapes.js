$.fn.circularText = function() {
    var textString = $(this).html();
    var wordList = textString.split(/\W+/);
    var fontSize = 16;
    var padding = parseInt($(this).css('padding').replace('px', ''));
    var $this = $(this);

    // let's load a font!
    var font = new Font();

    font.onload = function() {
        var radius = $this.innerWidth() / 2 - 2 * padding;
        var area = Math.PI * radius * radius;
        var textMeasure = font.measureText(textString, fontSize);
        var textArea = textMeasure.width * textMeasure.fontsize * 110 / 100;

        fontSize = fontSize * Math.sqrt(area / textArea);
        textMeasure = font.measureText(textString, parseInt(fontSize));
        console.log(textMeasure);
        console.log(font.metrics);


        $this.html('');

        var currElem = $('<span>');
        var counter = 0.5;
        var textHeight = fontSize;
        var curr = '';

        for (var i = 0; i < wordList.length; i++) {
            var targetWidth = 2 * Math.sqrt((2 * radius - textHeight * (counter)) * (textHeight * counter + padding));
            curr = currElem.html() + ' ' + wordList[i];
            if (font.measureText(curr, fontSize).width < targetWidth - 2 * padding) {
                currElem.append(' ' + wordList[i]);
            } else {
                currElem.append('<br/>')
                $this.append(currElem);
                currElem = $('<span>').append(wordList[i]);
                counter++;
            }
        }
        $this.append(currElem);

        $this.css({
            'font-size': fontSize,
            'text-align': 'center',
            'border-radius': '50%',
            'line-height': textHeight + 'px'
        });

    };


    // error handler
    font.onerror = function(err) {
        alert(err);
    };

    // then kick off font loading by assigning the "src" property
    font.fontFamily = $this.css('font-family');
    font.src = font.fontFamily;
};