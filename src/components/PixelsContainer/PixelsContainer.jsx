// React
import { useState, useEffect } from 'react';

// styles
import './pixels-container.scss';
import DragSelect from 'dragselect';

function PixelsContainer() {

  const [data, setData] = useState([]);
  const [selectableBlocks, setSelectableBlocks] = useState([]);

  const buildSelectables = () => {
    if (data.length) {
      console.log(data);
      const array = data.map(item => {
        const obj = item[1];
        let classes = '';
        
        if (!obj.block && !obj.purchased) {
          classes = 'selectable-pixel';
        } else if (obj.block) {
          classes = 'disabled';
        } else if (obj.purchased) {
          classes = 'purchased';
        }
        
        return (
          <div
            className={`pixel ${classes}`}
            data-id={obj.id}
            data-image={obj.imageSrc}
            key={obj.id}
          ></div>
        )
      })
      setSelectableBlocks(array);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('http://localhost:3030/data');
      const json = await res.json();
      setData(Object.entries(json));
    } 
    fetchData();
  }, [])

  useEffect(() => {
    buildSelectables();
    new DragSelect({
      selectables: document.querySelectorAll('.selectable-pixel'),
      multiSelectMode: true,
      draggability: false,
      area: document.querySelector('.pixels-container')
    });
  }, [data])


  return ( 
    <div className="pixels-container">
      <div className='selectable-pixels-container'>
        {selectableBlocks}
      </div>
    </div>
   );
}

export default PixelsContainer;