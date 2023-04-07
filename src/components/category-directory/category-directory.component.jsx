import CategoryItem from "../category-item/category-item.component";
import './category-directory.styles.scss'

const CategoryDirectory = ({categories}) => {
    return (
        <div className="directory-container">
            {categories.map((category) => (
                <CategoryItem key={category.id} category={category} />
            ))}     
        </div>
    )
}




export default CategoryDirectory;