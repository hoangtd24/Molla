import { useQuery } from "@apollo/client";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import NavigateNextOutlinedIcon from "@mui/icons-material/NavigateNextOutlined";
import ViewListOutlinedIcon from "@mui/icons-material/ViewListOutlined";
import ViewModuleOutlinedIcon from "@mui/icons-material/ViewModuleOutlined";
import {
  Box,
  Container,
  Drawer,
  Grid,
  Pagination,
  useMediaQuery,
} from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import classNames from "classnames/bind";
import { Fragment, useState } from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import ProductItem, {
  ProductItemProps,
} from "../../components/productItem/ProductItem";
import { FILTER_PRODUCT } from "../../graphql/query/Product";
import styles from "./Shop.module.scss";
import { GET_CATEGORIES } from "../../graphql/query/Category";
import { Category } from "../../components/header/HeaedOnLargeScreen";
import ProductItemThrough from "../../components/productItem/ProductItemThrough";

const cx = classNames.bind(styles);

const Shop = () => {
  const matches = useMediaQuery("(max-width:900px)");

  const [price, setPrice] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [sale, setSale] = useState<boolean>(false);
  const [top, setTop] = useState<boolean>(false);
  const [view, setView] = useState<number>(1);
  const [state, setState] = useState({
    left: false,
  });

  const handleChange = (event: SelectChangeEvent) => {
    setPrice(event.target.value);
  };

  const handleChangePage = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const { data: categoryData } = useQuery(GET_CATEGORIES);

  //call query filter product
  const param = useParams();
  const { data } = useQuery(FILTER_PRODUCT, {
    variables: {
      category: param.name === "all" ? null : param.name,
      limit: 6,
      page: page,
      price: price,
      sale: sale,
      top: top,
    },
  });

  //toggle drawer in samll screen
  const toggleDrawer =
    (anchor: "left", open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  return (
    <Box>
      <div className={cx("page-header")}>
        <h2 className={cx("header")}>Shop</h2>
        <h3 className={cx("sub-header")}>Find Your Items</h3>
      </div>
      <Box sx={{ borderBottom: "1px solid #ebebeb" }}>
        <Container>
          <div className={cx("breadcrumbs")}>
            <Link to="/">Home</Link>
            <span>{">"}</span>
            <span>Shop</span>
          </div>
        </Container>
      </Box>
      <Box sx={{ borderBottom: "1px solid #ebebeb", paddingBottom: "60px" }}>
        <Container>
          <Grid container spacing={3}>
            <Grid item md={3} display={{ xs: "none", md: "block" }}>
              <div className={cx("filter-wrapper")}>
                <div className={cx("filter-header")}>
                  <span className={cx("filter-lable")}>Filters</span>
                  <span
                    className={cx("filter-clear")}
                    onClick={() => {
                      setPrice("");
                      setSale(false);
                      setTop(false);
                    }}
                  >
                    Clean All
                  </span>
                </div>
                <div className={cx("filter-content")}>
                  <Accordion sx={{ boxShadow: "unset" }}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                      sx={{ padding: "0" }}
                    >
                      <Typography
                        sx={{
                          fontSize: "16px",
                          color: "#666",
                          fontWeight: 600,
                        }}
                      >
                        Category
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ padding: "0" }}>
                      {categoryData?.getCategories?.map(
                        (category: Category) => (
                          <NavLink
                            to={`/shop/${category.name}`}
                            className={({ isActive }) =>
                              cx("filter-item", { active: isActive })
                            }
                            key={category.id}
                          >
                            {category.name}
                          </NavLink>
                        )
                      )}
                    </AccordionDetails>
                  </Accordion>
                  <Accordion
                    sx={{
                      boxShadow: "unset",
                      "&::before": {
                        height: 0,
                      },
                    }}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                      sx={{ padding: "0" }}
                    >
                      <Typography
                        sx={{
                          fontSize: "16px",
                          color: "#666",
                          fontWeight: 600,
                        }}
                      >
                        Popular
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ padding: "0" }}>
                      <div className={cx("popular-item")}>
                        <input
                          type="checkbox"
                          name="sale"
                          id="sale"
                          checked={sale}
                          onChange={() => setSale(!sale)}
                        />
                        <label className={cx("filter-item")} htmlFor="sale">
                          On Sale
                        </label>
                      </div>
                      <div className={cx("popular-item")}>
                        <input
                          type="checkbox"
                          name="rate"
                          id="rate"
                          checked={top}
                          onChange={() => setTop(!top)}
                        />
                        <label className={cx("filter-item")} htmlFor="rate">
                          Top Rated
                        </label>
                      </div>
                    </AccordionDetails>
                  </Accordion>
                </div>
              </div>
            </Grid>
            <Grid item md={9} xs={12} minHeight={500}>
              <div className={cx("filter-result")}>
                <div className={cx("filter-result__header")}>
                  {data && data.filter?.total && (
                    <p>
                      Showing{" "}
                      {data.filter.total === 1
                        ? "a single"
                        : data.filter.total <= 6
                        ? `all of ${data.filter.total}`
                        : `${6 * (page - 1) + 1} - ${
                            6 * page < data.filter.total
                              ? 6 * page
                              : data.filter.total
                          } of ${data.filter.total}`}{" "}
                      products
                    </p>
                  )}
                  <div className={cx("filter-sort")}>
                    Sort by:
                    <FormControl
                      sx={{ m: 1, minWidth: 120, padding: 0 }}
                      size="small"
                    >
                      <InputLabel
                        id="demo-select-small-label"
                        sx={{ fontSize: "14px" }}
                      >
                        Sort
                      </InputLabel>
                      <Select
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        value={price}
                        label="Sort"
                        onChange={handleChange}
                      >
                        <MenuItem value={"ASC"}>Price: Low to height</MenuItem>
                        <MenuItem value={"DESC"}>Price: Height to low</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                  <div className={cx("filter-views")}>
                    <span
                      className={cx("filter-views__item", {
                        active: view === 2,
                      })}
                      onClick={() => setView(2)}
                    >
                      <ViewListOutlinedIcon sx={{ fontSize: "18px" }} />
                    </span>
                    <span
                      className={cx("filter-views__item", {
                        active: view === 1,
                      })}
                      onClick={() => setView(1)}
                    >
                      <ViewModuleOutlinedIcon sx={{ fontSize: "18px" }} />
                    </span>
                  </div>
                </div>
              </div>
              <Grid item container xs spacing={2}>
                {data &&
                  data.filter.products.map((product: ProductItemProps) => {
                    return view === 1 ? (
                      <Grid item xs={6} sm={4} key={product.id}>
                        <ProductItem {...product} />
                      </Grid>
                    ) : (
                      <Grid item xs={12} key={product.id}>
                        <ProductItemThrough {...product} />
                      </Grid>
                    );
                  })}
              </Grid>
              {data && data.filter?.pages > 1 && (
                <div className={cx("pagination")}>
                  <Pagination
                    count={data.filter.pages}
                    variant="outlined"
                    shape="rounded"
                    page={page}
                    onChange={handleChangePage}
                  />
                </div>
              )}
            </Grid>
          </Grid>
        </Container>
      </Box>
      {matches &&
        (["left"] as const).map((anchor) => (
          <Fragment key={anchor}>
            <span
              onClick={toggleDrawer(anchor, true)}
              className={cx("menu_icon")}
            >
              <NavigateNextOutlinedIcon sx={{ fontSize: "26px" }} />
            </span>
            <Drawer
              anchor={"left"}
              open={state[anchor]}
              onClose={toggleDrawer(anchor, false)}
            >
              <div className={cx("filter-wrapper")}>
                <div className={cx("filter-header")}>
                  <span className={cx("filter-lable")}>Filters</span>
                  <span className={cx("filter-clear")}>Clean All</span>
                </div>
                <div className={cx("filter-content")}>
                  <Accordion sx={{ boxShadow: "unset" }}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                      sx={{ padding: "0" }}
                    >
                      <Typography
                        sx={{
                          fontSize: "16px",
                          color: "#666",
                          fontWeight: 600,
                        }}
                      >
                        Category
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ padding: "0" }}>
                      {categoryData?.getCategories?.map(
                        (category: Category) => (
                          <NavLink
                            to={`/shop/${category.name}`}
                            className={({ isActive }) =>
                              cx("filter-item", { active: isActive })
                            }
                            key={category.id}
                          >
                            {category.name}
                          </NavLink>
                        )
                      )}
                    </AccordionDetails>
                  </Accordion>
                  <Accordion
                    sx={{
                      boxShadow: "unset",
                      "&::before": {
                        height: 0,
                      },
                    }}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                      sx={{ padding: "0" }}
                    >
                      <Typography
                        sx={{
                          fontSize: "16px",
                          color: "#666",
                          fontWeight: 600,
                        }}
                      >
                        Popular
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ padding: "0" }}>
                      <p className={cx("filter-item")}>Everage rating</p>
                      <p className={cx("filter-item")}>Latest</p>
                    </AccordionDetails>
                  </Accordion>
                </div>
              </div>
            </Drawer>
          </Fragment>
        ))}
    </Box>
  );
};

export default Shop;
