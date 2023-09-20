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
  Skeleton,
  useMediaQuery,
} from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import classNames from "classnames/bind";
import { Fragment, useEffect, useState } from "react";
import { Link, NavLink, useSearchParams } from "react-router-dom";
import { Category } from "../../components/header/HeaderOnLargeScreen";
import ProductItem, {
  ProductItemProps,
} from "../../components/productItem/ProductItem";
import { GET_CATEGORIES } from "../../graphql/query/Category";
import { SEARCH_PRODUCT } from "../../graphql/query/Product";
import styles from "./Search.module.scss";
import { sketelonData } from "../../data";

const cx = classNames.bind(styles);

const Search = () => {
  const [searchParams] = useSearchParams();
  const matches = useMediaQuery("(max-width:900px)");

  const [price, setPrice] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [sale, setSale] = useState<boolean>(false);
  const [top, setTop] = useState<boolean>(false);
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

  //call query filter product
  const { data, loading } = useQuery(SEARCH_PRODUCT, {
    variables: {
      limit: 6,
      page: page,
      price: price,
      sale: sale,
      top: top,
      search: searchParams.get("keyword"),
    },
  });
  const { data: categoryData, loading: cateLoading } = useQuery(GET_CATEGORIES);

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
  useEffect(() => {
    document.title = `Shop - Molla Funiture`;
  }, []);
  return (
    <Box>
      <div className={cx("page-header")}>
        <h1 className={cx("header")}>Shop</h1>
        <h2 className={cx("sub-header")}>Find Your Items</h2>
      </div>
      <Box sx={{ borderBottom: "1px solid #ebebeb" }}>
        <Container>
          <div className={cx("breadcrumbs")}>
            <Link to="/">Home</Link>
            <span>{">"}</span>
            <span>Shop</span>
            <span>{">"}</span>
            <span>Search results for "{searchParams.get("keyword")}"</span>
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
                      <h3 className={cx("category-heading")}>Category</h3>
                    </AccordionSummary>
                    <AccordionDetails sx={{ padding: "0" }}>
                      {cateLoading ? (
                        <div className={cx("category-sketelon__wrap")}>
                          {sketelonData.slice(0, 6).map((sketelon) => (
                            <Skeleton
                              variant="text"
                              width={"100%"}
                              sx={{ fontSize: "20px" }}
                              key={sketelon}
                            />
                          ))}
                        </div>
                      ) : (
                        categoryData?.getCategories?.map(
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
                      <h3 className={cx("category-heading")}>Popular</h3>
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
                  {loading ? (
                    <Skeleton
                      variant="text"
                      sx={{ fontSize: "18px" }}
                      width={200}
                    />
                  ) : data && data.search?.total ? (
                    <p>
                      Showing{" "}
                      {data.search.total === 1
                        ? "a single"
                        : data.search.total <= 6
                        ? `all of ${data.search.total}`
                        : `${6 * (page - 1) + 1} - ${
                            6 * page < data.search.total
                              ? 6 * page
                              : data.search.total
                          } of ${data.search.total}`}{" "}
                      products
                    </p>
                  ) : (
                    <p>No product match with search</p>
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
                    <span className={cx("filter-views__item", "active")}>
                      <ViewListOutlinedIcon sx={{ fontSize: "18px" }} />
                    </span>
                    <span className={cx("filter-views__item")}>
                      <ViewModuleOutlinedIcon sx={{ fontSize: "18px" }} />
                    </span>
                  </div>
                </div>
              </div>
              <Grid item container xs spacing={2}>
                {loading
                  ? sketelonData.slice(0, 6).map((sketelon) => (
                      <Grid item xs={6} sm={4} key={sketelon}>
                        <Skeleton
                          variant="rectangular"
                          width={350}
                          sx={{ paddingTop: "100%", maxWidth: "100%" }}
                        />
                        <Skeleton
                          variant="text"
                          width={"100%"}
                          sx={{ fontSize: "20px", marginTop: "10px" }}
                        />
                        <Skeleton
                          variant="text"
                          width={"100%"}
                          sx={{ fontSize: "20px" }}
                        />
                      </Grid>
                    ))
                  : data &&
                    data.search.products.map((product: ProductItemProps) => (
                      <Grid item xs={6} sm={4} key={product.id}>
                        <ProductItem {...product} />
                      </Grid>
                    ))}
              </Grid>
              {data && data.search?.pages > 1 && (
                <div className={cx("pagination")}>
                  <Pagination
                    count={data.search.pages}
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
                      <h3 className={cx("category-heading")}>Category</h3>
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
                      <h3 className={cx("category-heading")}>Popular</h3>
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

export default Search;
