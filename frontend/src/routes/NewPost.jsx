import Modal from "../components/Modal";
import classes from "./NewPost.module.css";
import { Link , Form} from "react-router-dom";

export default function NewPost() {
  return (
    <Modal>
      <Form method="post" className={classes.form}>
        <p>
          <label htmlFor="body">Text</label>
          <textarea id="body" name="body" rows={3} required />
        </p>
        <p>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="author" required />
        </p>
        <p className={classes.actions}>
          <Link to=".." type="button">
            Cancel
          </Link>
          <button>Submit</button>
        </p>
      </Form>
    </Modal>
  );
}
