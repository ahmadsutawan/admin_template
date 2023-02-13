

// APEXCHART
var options = {
	series: [{
	name: 'series1',
	data: [31, 40, 28, 51, 42, 109, 100]
}, {
	name: 'series2',
	data: [11, 32, 45, 32, 34, 52, 41]
}],
	chart: {
	height: 350,
	type: 'area'
},
	dataLabels: {
	enabled: false
},
	stroke: {
	curve: 'smooth'
},
	xaxis: {
	type: 'datetime',
	categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"]
},
	tooltip: {
		x: {
			format: 'dd/MM/yy HH:mm'
		},
	},
};

var chart = new ApexCharts(document.querySelector("#chart"), options);
chart.render();

// SIDEBAR
const toggleSidebar = document.querySelector('nav .toggle-sidebar');
const sidebar = document.getElementById('sidebar');
const allSideDivider = document.querySelectorAll('#sidebar .divider');
const sideDropdown = document.querySelectorAll('#sidebar .droplist');

toggleSidebar.addEventListener('click', function () {
	sidebar.classList.toggle('hide');

	if(sidebar.classList.contains('hide')) {
		allSideDivider.forEach(item=> {
			item.textContent = '-'
		})

		allDropdown.forEach(item=> {
			const a = item.parentElement.querySelector('a:first-child');
			a.classList.remove('active');
			item.classList.remove('show');
		})
	} else {
		allSideDivider.forEach(item=> {
			item.textContent = item.dataset.text;
		})
	}
})

const allSideMenu = document.querySelectorAll('#sidebar .side-menu.top li a');

allSideMenu.forEach(item=> {
	const li = item.parentElement;

	item.addEventListener('click', function () {
		allSideMenu.forEach(i=> {
			i.parentElement.classList.remove('active');
		})
		li.classList.add('active');
	})
});

sideDropdown.forEach(item=> {
	const a = item.parentElement.querySelector('a:first-child');
	a.addEventListener('click', function (e) {
		e.preventDefault();

		if(!this.classList.contains('active')) {
			sideDropdown.forEach(i=> {
				const sideDrop = i.parentElement.querySelector('a:first-child');

				sideDrop.classList.remove('active');
				i.classList.remove('show');
			})
		}

		this.classList.toggle('active');
		item.classList.toggle('show');
	})
})


// NAVBAR
// const searchButton = document.querySelector('#content nav form .form-input button');
// const searchButtonIcon = document.querySelector('#content nav form .form-input button .bx');
// const searchForm = document.querySelector('#content nav form');

// searchButton.addEventListener('click', function (e) {
// 	if(window.innerWidth < 576) {
// 		e.preventDefault();
// 		searchForm.classList.toggle('show');
// 		if(searchForm.classList.contains('show')) {
// 			// searchButtonIcon.classList.replace('bx-search', 'bx-x');
// 			searchButtonIcon.classList.replace('bx-search');
// 		} else {
// 			// searchButtonIcon.classList.replace('bx-x', 'bx-search');
// 			searchButtonIcon.classList.replace('bx-search');
// 		}
// 	}
// })

// if(window.innerWidth < 768) {
// 	sidebar.classList.add('hide');
// } else if(window.innerWidth > 576) {
// 	// searchButtonIcon.classList.replace('bx-x', 'bx-search');
// 	searchButtonIcon.classList.replace('bx-search');
// 	searchForm.classList.remove('show');
// }

// window.addEventListener('resize', function () {
// 	if(this.innerWidth > 576) {
// 		// searchButtonIcon.classList.replace('bx-x', 'bx-search');
// 		searchButtonIcon.classList.replace('bx-search');
// 		searchForm.classList.remove('show');
// 	}
// })

// change theme light/dark
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'bx-sun'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'bx-moon' : 'bx-sun'

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
    themeButton.classList[selectedIcon === 'bx-moon' ? 'add' : 'remove'](iconTheme)
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})

// CONTENT
// alert
let alert_close_icons = document.querySelectorAll('.alert>.close');
let alert = document.getElementById('alert');
let progress = document.querySelector('.progress');
if(alert_close_icons)
{
	alert_close_icons.forEach((alert_close_icon)=>{
		alert_close_icon.addEventListener('click', function(){
		this.closest('.alert').classList.add('close');
			this.closest('.alert').addEventListener('transitionend', function(event){
				if(event.propertyName=='transform'){
				this.remove();
				}
			});
		});
	});
	progress.classList.add('active')
	setTimeout(() => {
		document.getElementById('alert').style.transform = 'translateX(400px)';
	}, 5000);
}

// notif dropdown
const notif = document.querySelector('nav .notif');
const navlink = notif.querySelector('i');
const notifLink = notif.querySelector('.notif-link');

navlink.addEventListener('click', function () {
	notifLink.classList.toggle('show');
})

// menu card dropdown
const allMenu = document.querySelectorAll('main .content-data .head .menu');

allMenu.forEach(item=> {
	const icon = item.querySelector('.icon');
	const menuLink = item.querySelector('.menu-link');

	icon.addEventListener('click', function () {
		menuLink.classList.toggle('show');
	})
})

window.addEventListener('click', function (e) {
	if(e.target !== navlink) {
		if(e.target !== notifLink) {
			if(notifLink.classList.contains('show')) {
				notifLink.classList.remove('show');
			}
		}
	}

	allMenu.forEach(item=> {
		const icon = item.querySelector('.icon');
		const menuLink = item.querySelector('.menu-link');

		if(e.target !== icon) {
			if(e.target !== menuLink) {
				if (menuLink.classList.contains('show')) {
					menuLink.classList.remove('show')
				}
			}
		}
	})
})


// modal popup
const modalBtns = document.querySelectorAll(".modal-open");

	modalBtns.forEach(function(btn){
	btn.onclick = function(){
		let modal = btn.getAttribute('data-modal');
		document.getElementById(modal).style.display = 'block';
	}
});

const closeBtns = document.querySelectorAll(".modal-close");

	closeBtns.forEach(function(btn){
	btn.onclick = function(){
		let modal = (btn.closest('.modal').style.display = 'none');
	}
});

const plus = document.querySelector('.plus'),
	minus = document.querySelector('.minus'),
	num = document.querySelector('.num');
	let a = 0;
	plus.addEventListener('click', () => {
		a++;
		a = (a < 10) ? + a : a;
		num.innerText = a;
	})
	minus.addEventListener('click', () => {
		if(a > 0){
			a--;
			a = (a < 10) ? + a : a;
			num.innerText = a;
		}
	})


// select all record on datatable
const main = document.getElementById('selectAll');
const select = document.getElementsByClassName('select');

	main.onclick = function () {
		if (main.checked == true){
			for(let i = 0; i < select.length; i++){
				select[i].checked = true;
				document.querySelector('.select-all').style.display = 'inline';
			}
		}else {
			for(let i = 0; i < select.length; i++){
				select[i].checked = false;
				document.querySelector('.select-all').style.display = 'none';
			}
		}
	}


// datatables
const tbody = document.querySelector("tbody");
const pageUl = document.querySelector(".pagination");
const itemShow = document.querySelector("#itemperpage");
const tr = tbody.querySelectorAll("tr");
const emptyBox = [];
const index = 1;
const itemPerPage = 10;

	for(let i=0; i<tr.length; i++){ emptyBox.push(tr[i]);}

	itemShow.onchange = giveTrPerPage;
	function giveTrPerPage(){
		itemPerPage = Number(this.value);
		// console.log(itemPerPage);
		displayPage(itemPerPage);
		pageGenerator(itemPerPage);
		getpagElement(itemPerPage);
	}

	function displayPage(limit){
		tbody.innerHTML = '';
		for(let i=0; i<limit; i++){
			tbody.appendChild(emptyBox[i]);
		}
		let  pageNum = pageUl.querySelectorAll('.list');
		pageNum.forEach(n => n.remove());
	}
	displayPage(itemPerPage);

	function pageGenerator(getem){
		let num_of_tr = emptyBox.length;
		if(num_of_tr <= getem){
			pageUl.style.display = 'none';
		}else{
			pageUl.style.display = 'flex';
			let num_Of_Page = Math.ceil(num_of_tr/getem);
			for(i=1; i<=num_Of_Page; i++){
				let li = document.createElement('li'); li.className = 'list';
				let a =document.createElement('a'); a.href = '#'; a.innerText = i;
				a.setAttribute('data-page', i);
				li.appendChild(a);
				pageUl.insertBefore(li,pageUl.querySelector('.next'));
			}
		}
	}
	pageGenerator(itemPerPage);
	let pageLink = pageUl.querySelectorAll("a");
	let lastPage =  pageLink.length - 2;
	
	function pageRunner(page, items, lastPage, active){
		for(button of page){
			button.onclick = e=>{
				let page_num = e.target.getAttribute('data-page');
				let page_mover = e.target.getAttribute('id');
				if(page_num != null){
					index = page_num;

				}else{
					if(page_mover === "next"){
						index++;
						if(index >= lastPage){
							index = lastPage;
						}
					}else{
						index--;
						if(index <= 1){
							index = 1;
						}
					}
				}
				pageMaker(index, items, active);
			}
		}

	}
	let pageLi = pageUl.querySelectorAll('.list'); pageLi[0].classList.add("active");
	pageRunner(pageLink, itemPerPage, lastPage, pageLi);

	function getpagElement(val){
		let pagelink = pageUl.querySelectorAll("a");
		let lastpage =  pagelink.length - 2;
		let pageli = pageUl.querySelectorAll('.list');
		pageli[0].classList.add("active");
		pageRunner(pagelink, val, lastpage, pageli);
		
	}

	function pageMaker(index, item_per_page, activePage){
		let start = item_per_page * index;
		let end  = start + item_per_page;
		let current_page =  emptyBox.slice((start - item_per_page), (end-item_per_page));
		tbody.innerHTML = "";
		for(let j=0; j<current_page.length; j++){
			let item = current_page[j];					
			tbody.appendChild(item);
		}
		Array.from(activePage).forEach((e)=>{e.classList.remove("active");});
			activePage[index-1].classList.add("active");
		}


// search content 
function tableSearch(){
	let input, filter, table, tr, td, txtValue;

	input = document.getElementById('myInput');
	filter = input.value.toUpperCase();
	table = document.getElementById('myTable');
	tr = table.getElementsByTagName('tr');

	for(let i = 0; i < tr.length; i++){
		td = tr[i].getElementsByTagName('td')[2];
		if(td){
			txtValue = td.textContent || td.innerText;
			if(txtValue.toUpperCase().indexOf(filter) > -1){
				tr[i].style.display='table-row';
			}else{
				tr[i].style.display='none';
			}
		}
	}
}

