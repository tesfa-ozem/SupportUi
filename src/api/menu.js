/* eslint-disable */
const Menu =  [
    { header: 'Apps' },
    
    
    {
      title: 'Payments',
      group: 'apps',
      icon: 'dashboard',
      name: 'Payments',
    },
    { divider: true },
    
  ];
  // reorder menu
  Menu.forEach((item) => {
    if (item.items) {
      item.items.sort((x, y) => {
        let textA = x.title.toUpperCase();
        let textB = y.title.toUpperCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });
    }
  });
  
  export default Menu;