import React, { useState } from "react";
import "../style/Board.scss";
import { ReactComponent as EditIcon } from "../icons/edit.svg";
import { ReactComponent as SaveIcon } from "../icons/save.svg";
import { ReactComponent as DeleteIcon } from "../icons/delete.svg";
import { ReactComponent as AddIcon } from "../icons/add.svg";
import { ReactComponent as LeftIcon } from "../icons/left.svg";
import { ReactComponent as RightIcon } from "../icons/right.svg";
import { ReactComponent as UpIcon } from "../icons/up.svg";
import { ReactComponent as DownIcon } from "../icons/down.svg";
import PopUp from "./PopUp";

interface BoardProps {
  bodyPosition: { x: number; y: number };
  bodyScale: number;
  handleBodyMove: (movementX: number, movementY: number) => void;
}

const Board: React.FC<BoardProps> = ({
  bodyPosition,
  bodyScale,
  handleBodyMove,
}) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategory, setNewCategory] = useState<string>("");
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [newSubcategory, setNewSubcategory] = useState<string>("");
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>(-1);
  const [services, setServices] = useState<Service[]>([]);
  const [newService, setNewService] = useState<string>("");

  interface Category {
    id: number;
    name: string;
    subcategories: Subcategory[];
    editing: boolean;
  }

  interface Subcategory {
    id: number;
    name: string;
    editing: boolean;
  }

  interface Service {
    id: number;
    subcategoryId: number;
    name: string;
    editing: boolean;
  }

  const addCategory = () => {
    const newCategoryId = categories.length + 1;

    setCategories((prevCategories) => [
      ...prevCategories,
      {
        id: newCategoryId,
        name: `${selectedOption} ${newCategoryId}`,
        subcategories: [],

        editing: true,
      },
    ]);
  };

  const saveCategory = (categoryId: number) => {
    setCategories((prevCategories) =>
      prevCategories.map((category) =>
        category.id === categoryId
          ? { ...category, editing: false, name: newCategory }
          : category
      )
    );
    setNewCategory("");
  };

  const setEditingSubcategoryId = (categoryId: number, index: number) => {
    setCategories((prevCategories) =>
      prevCategories.map((category) =>
        category.id === categoryId
          ? {
              ...category,
              subcategories: category.subcategories.map((sub, i) =>
                i === index ? { ...sub, editing: true } : sub
              ),
            }
          : category
      )
    );
  };

  const setEditingCategoryId = (categoryId: number) => {
    setCategories((prevCategories) =>
      prevCategories.map((category) =>
        category.id === categoryId ? { ...category, editing: true } : category
      )
    );
  };

  const deleteCategoryById = (categoryId: number) => {
    setCategories((prevCategories) =>
      prevCategories.filter((category) => category.id !== categoryId)
    );
  };

  const deleteSubcategoryById = (categoryId: number, index: number) => {
    setCategories((prevCategories) =>
      prevCategories.map((category) =>
        category.id === categoryId
          ? {
              ...category,
              subcategories: category.subcategories.filter(
                (_, i) => i !== index
              ),
            }
          : category
      )
    );
  };

  const addSubcategory = (categoryId: number) => {
    setShowPopup(true);
    setSelectedOption("Subcategory");
    setSelectedCategoryId(categoryId);
  };

  const confirmSubcategory = () => {
    if (selectedOption && selectedCategoryId !== null) {
      setCategories((prevCategories) =>
        prevCategories.map((category) =>
          category.id === selectedCategoryId
            ? {
                ...category,
                subcategories: [
                  ...category.subcategories,
                  {
                    id: category.subcategories.length + 1,
                    name: newSubcategory,
                    editing: true,
                  },
                ],
              }
            : category
        )
      );
      setShowPopup(false);
    }
  };

  const handleSubcategoryNameChange = (
    categoryId: number,
    index: number,
    newName: string
  ) => {
    setCategories((prevCategories) =>
      prevCategories.map((category) =>
        category.id === categoryId
          ? {
              ...category,
              subcategories: category.subcategories.map((sub, i) =>
                i === index ? { ...sub, name: newName } : sub
              ),
            }
          : category
      )
    );
  };

  const saveSubcategory = (categoryId: number, index: number) => {
    setCategories((prevCategories) =>
      prevCategories.map((category) =>
        category.id === categoryId
          ? {
              ...category,
              subcategories: category.subcategories.map((sub, i) =>
                i === index ? { ...sub, editing: false } : sub
              ),
            }
          : category
      )
    );
  };

  const deleteSubcategory = (categoryId: number, index: number) => {
    setCategories((prevCategories) =>
      prevCategories.map((category) =>
        category.id === categoryId
          ? {
              ...category,
              subcategories: category.subcategories.filter(
                (_, i) => i !== index
              ),
            }
          : category
      )
    );
  };

  const addService = (subcategoryId: number) => {
    setShowPopup(true);
    setSelectedOption("Service");
    setSelectedCategoryId(subcategoryId);
  };

  const confirmService = () => {
    if (selectedOption && selectedCategoryId !== null) {
      setServices((prevServices) => [
        ...prevServices,
        {
          id: prevServices.length + 1,
          subcategoryId: selectedCategoryId,
          name: newService, 
          editing: true,
        },
      ]);
      setNewService(""); 
      setShowPopup(false);
    }
  };

  const handleServiceNameChange = (index: number, newName: string) => {
    setServices((prevServices) =>
      prevServices.map((service, i) =>
        i === index ? { ...service, name: newName } : service
      )
    );
  };

  const saveService = (index: number) => {
    setServices((prevServices) =>
      prevServices.map((service, i) =>
        i === index ? { ...service, editing: false } : service
      )
    );
  };
  const setEditingServiceId = (index: number) => {
    setServices((prevServices) =>
      prevServices.map((service, i) =>
        i === index ? { ...service, editing: true } : service
      )
    );
  };

  const deleteService = (index: number) => {
    setServices((prevServices) => prevServices.filter((_, i) => i !== index));
  };

  const renderServices = (subcategoryId: number) => {
    const subcategoryServices = services.filter(
      (service) => service.subcategoryId === subcategoryId
    );

    return subcategoryServices.map((service, index) => (
      <div key={service.id} className="service">
        {service.editing ? (
          // Service editing mode
          <div className="category-box">
            <div className="input-container">
              <input
                type="text"
                placeholder=" "
                value={service.name}
                onChange={(e) => handleServiceNameChange(index, e.target.value)}
              />
            </div>

            <button className="bt-save" onClick={() => saveService(index)}>
              <SaveIcon className="icon" />
            </button>
            <button className="bt-delete" onClick={() => deleteService(index)}>
              <DeleteIcon className="icon" />
            </button>
          </div>
        ) : (
          // Service display mode
          <div className="service-box">
            <div className="service-block">{service.name}</div>
            <div className="service-btn-box">
              <button
                className="bt-add"
                onClick={() => addService(selectedCategoryId)}
              >
                <AddIcon className="icon" />
              </button>
              <button
                className="bt-edit-name"
                onClick={() => setEditingServiceId(index)}
              >
                <EditIcon className="icon" />
              </button>
              <button
                className="bt-delete"
                onClick={() => deleteService(index)}
              >
                <DeleteIcon className="icon" />
              </button>
            </div>
          </div>
        )}
      </div>
    ));
  };

  const renderSubcategories = (category: Category) => {
    return category.subcategories.map((subcategory, index) => (
      <div key={subcategory.id} className="subcategory">
        {subcategory.editing ? (
          <div className="category-box">
            <div className="input-container">
              <input
                type="text"
                placeholder=" "
                value={subcategory.name}
                onChange={(e) =>
                  handleSubcategoryNameChange(
                    category.id,
                    index,
                    e.target.value
                  )
                }
              />
            </div>

            <button
              className="bt-save"
              onClick={() => saveSubcategory(category.id, index)}
            >
              <SaveIcon className="icon" />
            </button>
            <button
              className="bt-delete"
              onClick={() => deleteSubcategory(category.id, index)}
            >
              <DeleteIcon className="icon" />
            </button>
          </div>
        ) : (
          <div className="category-box">
            <div className="subcategory-block">{subcategory.name}</div>
            <div className="subcategory-btn-box">
              <button
                className="bt-add"
                onClick={() => addSubcategory(category.id)}
              >
                <AddIcon className="icon" />
              </button>
              <button
                className="bt-edit-name"
                onClick={() => setEditingSubcategoryId(category.id, index)}
              >
                <EditIcon className="icon" />
              </button>
              <button
                className="bt-delete"
                onClick={() => deleteSubcategoryById(category.id, index)}
              >
                <DeleteIcon className="icon" />
              </button>
            </div>
          </div>
        )}
        <div className="render-service">{renderServices(subcategory.id)}</div>
      </div>
    ));
  };

  const renderCategories = () => {
    return categories.map((category) => (
      <div key={category.id} className="category">
        {category.editing ? (
          <div className="category-box">
            <div className="input-container">
              <input
                type="text"
                placeholder=" "
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
              />
              <label>Category name</label>
            </div>
            <button
              className="bt-save"
              onClick={() => saveCategory(category.id)}
            >
              <SaveIcon className="icon" />
            </button>
            <button
              className="bt-delete"
              onClick={() => deleteCategoryById(category.id)}
            >
              <DeleteIcon className="icon" />
            </button>
          </div>
        ) : (
          <div className="category-box">
            <div className="category-block">{category.name}</div>
            <div className="category-btn-box">
              <button
                className="bt-add"
                onClick={() => addSubcategory(category.id)}
              >
                <AddIcon className="icon" />
              </button>
              <button
                className="bt-edit-name"
                onClick={() => setEditingCategoryId(category.id)}
              >
                <EditIcon className="icon" />
              </button>
              <button
                className="bt-delete"
                onClick={() => deleteCategoryById(category.id)}
              >
                <DeleteIcon className="icon" />
              </button>
            </div>
          </div>
        )}
        <div className="subcategory">{renderSubcategories(category)}</div>
      </div>
    ));
  };

  return (
    <div className="board">
      <div className="move-buttons">
        <button className="left-button" onClick={() => handleBodyMove(-10, 0)}>
          <LeftIcon />
        </button>
        <button className="right-button" onClick={() => handleBodyMove(10, 0)}>
          <RightIcon />
        </button>
        <button className="up-button" onClick={() => handleBodyMove(0, -10)}>
          <UpIcon />
        </button>
        <button className="down-button" onClick={() => handleBodyMove(0, 10)}>
          <DownIcon />
        </button>
      </div>
      <div
        className="draggable-board"
        style={{
          transform: `translate(${bodyPosition.x}px, ${
            bodyPosition.y
          }px) scale(${bodyScale / 100})`,
        }}
      >
        <div className="draggable-component">
          <div className="draggable-box">
            <div className="categories"> Categories </div>
            <button className="btn-add-category" onClick={addCategory}>
              <AddIcon className="icon" />
            </button>
          </div>
        </div>
        <div className="box">{renderCategories()}</div>
      </div>
      {showPopup && (
        <PopUp
          confirmSubcategory={confirmSubcategory}
          confirmService={confirmService}
          setShowPopup={setShowPopup}
        />
      )}
    </div>
  );
};

export default Board;
