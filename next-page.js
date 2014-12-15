jQuery(document).ready(function($) {
	$('.shop-menu-next-menu-btn').css("display", "block").click(function() {
		var $button = $(this);
		var category = $button.data("category");
		if (!category) return false;
		$loader = $('.shop-menu-loader-category'+category).css("display", "block");
		$button.css("display", "none");
		$.ajax({
			type : 'POST',
			url : SM_Setting.ajaxurl,
			data : {
				action : SM_Setting.action,
				page : SM_Setting.next_page_per_category[category] ? SM_Setting.next_page_per_category[category] : SM_Setting.next_page,
				category : category
			},
			timeout : 8000,
			error : function() {
				$loader.css("display", "none");
				$button.css("display", "block");
				alert("データを取得できません");
			},
			success : function(data) {
				SM_Setting.next_page_per_category[category] = data.next_page;
				var html = createHtml( data );
				$('.shop-menu-item.shop-menu-item-category' + category + ':last').after(html);
				$('.shop-menu-item.shop-menu-item-category' + category + ':hidden').fadeIn("slow");
				$loader.css("display", "none");
				if (data.next_page ) {
					$button.css("display", "block");
				}
			}
		});
		return false;
	});
	function createHtml( data ){
		var items = data.items
		var html = '';
		var target = data.window_open ? ' target="_blank" ' : "";
		for ( var i = 0; i < items.length; i++){
			html += '<div class="shop-menu-item"><a href="' + items[i].url + '"' + target + '>'
			+ items[i].img_tag + '<p class="shop-menu-name">' + items[i].title + '</p>';
			if ( data.show_price ){
				html += '<p class="shop-menu-price">' + items[i].price + '</p>';
			}
			html += '</a></div>';
		}
		return html;
	}
});
