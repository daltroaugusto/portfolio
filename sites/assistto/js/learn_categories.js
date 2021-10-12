/**
    Daltro Augusto's Portfolio
    Copyright (C) 2021  Daltro Augusto

    This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

    This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

for (category of $$(".categories li")) {
  category.addEventListener("click", (e) => {
    $(".categories li[active]").removeAttribute("active");
    e.currentTarget.setAttribute("active", "true");

    if (
      $(".categories ul > li:nth-of-type(1)") == $(".categories li[active]")
    ) {
      $(".popular").style.display = "block";
    } else $(".popular").style.display = "none";
  });
}
