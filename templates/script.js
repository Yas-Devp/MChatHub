const list = document.getElementById('list');
const p_que = document.getElementById('question');

p_que.addEventListener('mouseover', function(){
	list.style.opacity = '1';
	p_que.style.fontSize = '18px';
	p_que.style.fontWeight = 'bold';
	//display: flex;flex-direction: column;align-items: start;
});

p_que.addEventListener('mouseout', function(){
	list.addEventListener('mouseover', function(){
		list.style.opacity = '1';
		p_que.style.fontSize = '18px';
		p_que.style.fontWeight = 'bold';
	});
	
	list.addEventListener('mouseout', function(){
		list.style.opacity = '0';
		p_que.style.fontSize = '16px';
		p_que.style.fontWeight = 'normal';
	});

	list.style.opacity = '0';
	p_que.style.fontSize = '16px';
	p_que.style.fontWeight = 'normal';
});