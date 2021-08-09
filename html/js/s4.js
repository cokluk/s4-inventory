//var inventory_ornek = `{"inv":[{"shouldClose":0,"image":"phone.png","info":{"aitlik":"steam:11000010adab671","isim":"Ahmet Bey","telno":"0669249131","durum":"kilitli"},"count":1,"label":"Telefon","type":"item","usable":true,"name":"phone","description":"Telefon","slot":1,"unique":true,"weight":0.6},{"shouldClose":1,"image":"bankakarti.png","info":{"iban":"152","isim":"Ahmet Bey","aitlik":"steam:11000010adab671"},"count":1,"label":"BankaKarti","type":"item","usable":true,"name":"bankcard","description":"Banka Kartı","slot":2,"unique":true,"weight":1},null,{"shouldClose":0,"image":"phone.png","info":{"aitlik":"steam:11000010adab671","isim":"Ahmet Bey","telno":"0669249131","durum":"kilitli"},"count":1,"label":"Telefon","type":"item","usable":true,"name":"phone","description":"Telefon","slot":4,"unique":true,"weight":0.6}]}`;

$("body").css("display", "none");
var LastInventory = null;

$( function() {  

 


$("#items").sortable({
    
	appendTo: '.inv-con', 
    start: function(e, ui) {
        
        $(this).attr('data-previndex', ui.item.index());
		 $(".inv-sol").css("overflow-y", "unset");
     },
    update: function(e, ui) {
	    
        var yeni = ui.item.index()+1;
		var eski = parseInt($(this).attr('data-previndex'))+1;
	 
		if($("#"+yeni).hasClass("noneblock")) { 
		     $(this).attr('data-previndex', yeni);
			 
		}else {
           ChangeSlot(eski, yeni);    	
           $(this).removeAttr('data-previndex');
		   
		}
		
		
    }, 
	stop: function(e, ui) {
		 $(".inv-sol").css("overflow-y", "scroll");
		
	}
	
	
	
});
$("#items").disableSelection();

for (let i = 0; i < 41; i++) {
  $("#items").append(`<div class="inv-slot noneblock" id="slot_${i+1}" data-slot="${i+1}" data-drm="bos" ></div>`);
}

 
 
 $("#useItem").droppable({
      drop: function( event, ui ) {
		$.post('https://s4-inventory/useItem', JSON.stringify({ i:$(ui.draggable).data("slot") }));  
		clearInventoryData();
        $.post('https://s4-inventory/exit', JSON.stringify({}));
      }
 });

 $("#deleteItem").droppable({
      drop: function( event, ui ) {
         var slot = $(ui.draggable).data("slot");
		 
		 $.post('https://s4-inventory/deleteItem', JSON.stringify({ i:slot }));  
		 
		 $(ui.draggable).css("display", "none");
      }
 });	
	
	
	
} );





window.addEventListener('message', function(event) { 

   
   switch(event.data.name)
   {
    case "S4.LOAD.INV":
        LoadInventory(event.data.data);
        break;
   }	

});

ChangeSlot = (o, n) => { 

    $.post('https://s4-inventory/ChangeSlot', JSON.stringify({ o:o , n:n }));  
    $.post('https://s4-inventory/RefreshInventory', JSON.stringify({}));  
     
}

LoadInventory = (data) => {
	$("body").css("display", "block");
	var items = JSON.parse(data);
    LastInventory = null;
	LastInventory = items;
	
	$(".inv-sol").html("");
	for (let i = 0; i < 41; i++) {
      $("#items").append(`<div class="inv-slot noneblock" id="slot_${i+1}" data-slot="${i+1}" data-drm="bos" ></div>`);
    }
	
	
	$.each(items["inv"], function(i, item){
		
	    if(item === null) { return; }
 
		$("#slot_"+item.slot).removeClass("noneblock");
		 
		$("#slot_"+item.slot).append(`
		 
		  <center><img src="img/${item.image}" style="max-width:100px; margin:auto;"  /></center>
		  <p>${item.label}</p>
		
		`);
 
    });
}

clearInventoryData = () => {
	LastInventory = null;
	$(".inv-sol").html("");
	for (let i = 0; i < 41; i++) {
      $("#items").append(`<div class="inv-slot noneblock" id="slot_${i+1}" data-slot="${i+1}" data-drm="bos" ></div>`);
    }
	$("body").css("display", "none");
}


document.onkeyup = function (data) {
        if (data.which == 27 || data.which == 113) 
        {
            clearInventoryData();
            $.post('https://s4-inventory/exit', JSON.stringify({}));
            return
        }
    };


