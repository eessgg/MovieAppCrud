import React from 'react';

const ListGroup = (props) => {
   const {
     items,
     textProperty,
     valueProperty,
     selectedItem,
     onItemSelect,
   } = props;

  return (
    <div class="btn-group btn-group-toggle" data-toggle="buttons">
      {items.map((item) => (
        <label
          className={
            item === selectedItem ? "btn btn-light active" : "btn btn-light"
          }
          onClick={() => onItemSelect(item)}
          key={item[valueProperty]}
        >
          <input
            type="radio"
            name="options"
            id="option1"
            autocomplete="off"
            checked
          />
          {item[textProperty]}
        </label>
      ))}
    </div>
  );
}

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};

export default ListGroup;
