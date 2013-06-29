MicroPicker
===========

### Presentation ###

MicroPicker allows a user to turn an HTML element into a hue picker which can be linked to an input. This plugin aims at being very flexible and easy to incrust into any interface without forcing the user to have a pop-up of predefined style and size.

- Licence : MIT

### Compatibility ###

- Requires jQuery (old versions should work fine);
- Uses CSS3 gradiants;

<table>
    <tr>
        <td>Firefox</td><td>Chrome</td><td>Opera</td><td>Safari</td><td>Internet Explorer</td>
    </tr>
    <tr>
        <td>3.6+</td><td>10.0+</td><td>11.6+</td><td>5.1+</td><td>10+</td>
    </tr>
</table>



### Synopsis ###

The color picker can be either horizontal or vertical depending on its CSS class. Use either "Horizontal" or "Vertical", at least one, not both. For the CSS to work, the element must also have the class "MicroPicker".


    $.fn.microPicker(options)

The parameter "options" may contain the following properties;
+ <b>input</b> : The input element to be linked to the picker. It can be either a raw DOM element or a jQuery collection, in which case only the first element will be considered.
+ <b>initial</b> : Initial hue value between 0 and 360.
+ <b>format</b> : String to be used to determine the value to be set into the associated input or passed to the given callback. "{H}" will be replaced by the hue, "{S}" by the saturation, and "{L}" by the lightness. If no formatting string is provided, a default one will be used : "hsl(hue,saturation%,lightness%)" which can be directly used with css.
+ <b>callback</b> : A function to be called everytime anew value is picked (i.e on mouse move and if mouse button is down). The function will be passed two parameters :
    + <b>e</b> : The event object;
    + <b>data</b> : An object containing details about the color :
        + <b>h</b> : Hue;
        + <b>s</b> : Saturation;
        + <b>l</b> : Lightness;
        + <b>hsl</b> : Formatted string.
  
### Usage examples ###

Horizontal picker :

    <div id="hPicker" class="MicroPicker Horizontal"></div>
    <input type="text" />

    $('#hPicker').microPicker({
        input: $('#hInput'),
        initial: 180,
        format: 'HUE: {H} / SATURATION: {S} / LIGHTNESS: {L}',
        callback: function(e, data) {
            document.body.style.background = data.hsl;
        }
    });

Vertical picker :

    <div id="vPicker" class="MicroPicker Vertical"></div>
    <input type="text" />

    $('#vPicker').microPicker({ input: document.getElementById('vInput') });
    
It is recomended not to call this function before the document is loaded :

    (function($) {
        $(document).ready(function() {
            $('#vPicker').microPicker({ input: document.getElementById('vInput') });
        });
    })(jQuery);
