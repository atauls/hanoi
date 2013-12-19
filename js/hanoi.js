$(document).ready(function(){
	var allowMovement = true;
	$( ".disk" ).draggable({
		cursor: "move",
		revert: true,
		start: function(){
			var inMovementDisk = $(this).attr('id');
			var inMovementTower = $(this).parent().attr('id');
			var topDisk = $($('#'+inMovementTower).children()[0]).attr('id');
			
			if(topDisk==inMovementDisk){				
				allowMovement = true;
			}else{				
				allowMovement = false;				
			}
			
		},
		stop: function(){
			if(!allowMovement){
				$(this).animate({left:0,top:0});				
			}
		}
	});
	$( "#tower1, #tower2, #tower3" ).droppable({
		hoverClass: "droptower",
		drop:function( event, ui ){			
			var afterMovementTower = $(this).attr('id');			
			var topDisk = $($('#'+afterMovementTower).children()[0]).attr('id');
			if(typeof topDisk != 'undefined'){
				var topDiskNumber = parseInt(topDisk.substring(4,5))
				var inMovementDiskNumber = parseInt($(ui.draggable).attr('id').substring(4,5));				
				if(inMovementDiskNumber > topDiskNumber){				
					if(allowMovement){
						moveDisk(ui.draggable, afterMovementTower);
					}					
				}else{					
					$(ui.draggable).animate({left:0,top:0});
				}
			}else{				
				if(allowMovement){
					moveDisk(ui.draggable, afterMovementTower);
				}
			}		
		}
	});
});

function moveDisk(disk, tower) {
	var marginBottoms = new Array(-130,-100,-90,-80);
	var totalDiskInTower = $('#'+tower).children().length;
    $(disk).css('top', '0px');
	$(disk).css('left', '0px');
	$(disk).css('margin-bottom', '0px');
	$('#'+tower).prepend(disk);
	$(disk).animate({marginBottom: marginBottoms[totalDiskInTower]});
	var diskInTower1 = $('#tower1').children().length;
	var diskInTower2 = $('#tower2').children().length;
	if(diskInTower1+diskInTower2==0){
		setTimeout('alert("Hurray! You win!!")',1000);
	}
}