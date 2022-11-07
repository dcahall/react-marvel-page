const onKey = (e, action1, action2) => {
	if (e.key === ' ' || e.key === 'Enter') {
		action1();
		if (action2) {
			action2()
		}
	}
}

export default onKey;